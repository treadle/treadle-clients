// Libraries
import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Alert, Button, AppState } from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { Magnetometer, Gyroscope, DeviceMotion } from 'expo-sensors';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import * as tf from '@tensorflow/tfjs';
import { RootStackScreenProps } from '../types/navigation-types';

// Logic
import calcDist from '../utils/calcDist';
import calcTimeDiffMs from '../utils/calcTimeDiffMs';

//inference
import calcQuaternions from '../utils/calcQuaternions';
import executeModel from '../utils/executeModel';
import loadModel from '../utils/loadModel';
import processScanData from '../utils/processScanData';
import { useEnergyTokensStore } from '../store/useEnergyTokensStore';

// Constants for GPS correction
const UPDATE_DISTANCE = 10;
const MOMENTARY_DISTANCE_TRESHOLD = 100;
const SPEED_UPPER_THRESHOLD = 100;
const SPEED_LOWER_THRESHOLD = 0;

// Inference correction
const UPPER_LOSS_LIMIT = 0.8;
const LOWER_LOSS_LIMIT = 0.1;

export default function BikeRideScreen({ navigation, route }: RootStackScreenProps<'BikeRide'>) {
  // Is app ready?
  const [isReady, setIsReady] = useState(false);

  // Elapsed ride time
  const [seconds, setSeconds] = useState(0);

  // GPS-Tracking
  const [location, setLocation] = useState([null, null]);
  const [travelledDistance, setTravelledDistance] = useState(0);
  const travelledDistanceBuffer = useRef(0);
  const [travelledKm, setTravelledKm] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);

  // Economy
  const [energy, setEnergy] = useState(10);
  const [durability, setDurability] = useState(100);
  const [earnedTokens, setEarnedTokens] = useState(0);
  const [isEnded, setIsEnded] = useState(false);

  // Subscriptions
  const timer = useRef(null);
  const locationWatcher = useRef(null);
  const appStateListener = useRef(null);

  // Inference
  const magSubListener = useRef(null);
  const gyrSubListener = useRef(null);
  const devSubListener = useRef(null);
  const model = useRef(null);

  const [isBicycle, setIsBicycle] = useState(true);

  const bicycle = JSON.parse(route?.params?.selectedBike?.metadata?.extra as string);

  const {
    energy: energyStore,
    setEnergy: setEnergyStore,
    tokens,
    setTokens,
  } = useEnergyTokensStore();

  const [devMotion, setDevMotion] = useState({
    acc_z: 0,
    acc_y: 0,
    acc_x: 0,
    gra_z: 0,
    gra_y: 0,
    gra_x: 0,
    ori_qz: 0,
    ori_qy: 0,
    ori_qx: 0,
    ori_qw: 0,
    ori_roll: 0,
    ori_pitch: 0,
    ori_yaw: 0,
  });

  const [gyr, setGyr] = useState({
    gyr_z: 0,
    gyr_y: 0,
    gyr_x: 0,
  });

  const [mag, setMag] = useState({
    mag_z: 0,
    mag_y: 0,
    mag_x: 0,
  });

  const [scanData, setScanData] = useState([]);

  // Exiting the ride
  const endRide = async () => {
    if (locationWatcher.current !== null) await locationWatcher.current.remove();

    deactivateKeepAwake();
    clearInterval(timer.current);
    setSeconds(0);
    setLocation([null, null]);
    magSubListener.current && magSubListener.current.remove();
    gyrSubListener.current && gyrSubListener.current.remove();
    devSubListener.current && devSubListener.current.remove();
    appStateListener.current && appStateListener.current.remove();
    console.log('Ride terminated');
  };

  // Run the model on the data from sensors every 10 seconds
  useEffect(() => {
    const inference = async () => {
      const res = await executeModel(model.current, processScanData(scanData));

      if (res[0] > LOWER_LOSS_LIMIT && res[0] < UPPER_LOSS_LIMIT) {
        setTravelledDistance((prev) => prev + travelledDistanceBuffer.current);
        setIsBicycle(true);
      } else {
        setIsBicycle(false);
      }

      travelledDistanceBuffer.current = 0;

      console.log(res[0]);
      setScanData([]);
    };

    if (scanData.length === 200) {
      inference();
    }
  }, [scanData]);

  // Update data on every DeviceMotion update. It is binded to DeviceMotion listener for better consistency
  useEffect(() => {
    setScanData((prev) => [
      ...prev,
      {
        acc_z: devMotion.acc_z,
        acc_y: devMotion.acc_y,
        acc_x: devMotion.acc_x,
        gyr_z: gyr.gyr_z,
        gyr_y: gyr.gyr_y,
        gyr_x: gyr.gyr_x,
        gra_z: devMotion.gra_z,
        gra_y: devMotion.gra_y,
        gra_x: devMotion.gra_x,
        mag_z: mag.mag_z,
        mag_y: mag.mag_y,
        mag_x: mag.mag_x,
        ori_qz: devMotion.ori_qz,
        ori_qy: devMotion.ori_qy,
        ori_qx: devMotion.ori_qx,
        ori_qw: devMotion.ori_qw,
        ori_roll: devMotion.ori_roll,
        ori_pitch: devMotion.ori_pitch,
        ori_yaw: devMotion.ori_yaw,
      },
    ]);
  }, [devMotion]);

  // On ride has begun
  useEffect(() => {
    activateKeepAwake();
    appStateListener.current = AppState.addEventListener('change', (nextAppState) => {
      const endOnLeaveApp = async () => {
        setIsEnded(true);
        console.log('background');
      };

      endOnLeaveApp();
    });

    const beginRide = async () => {
      // Load Tensorflow JS
      await tf.setBackend('cpu');
      await tf.ready();

      // Load the AI model
      model.current = await loadModel();
      setEnergy(energyStore);
      setDurability(bicycle.durability / 100);

      // Subscription to geolocation updates
      locationWatcher.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: UPDATE_DISTANCE,
        },
        (loc) => {
          setLocation((prevLoc) => {
            return [prevLoc[1], loc];
          });
        }
      );

      // Timer initialization
      timer.current = setInterval(() => setSeconds((seconds) => seconds + 1), 1000);

      // Set update interval on each sensor to match 20 HZ frequency
      Magnetometer.setUpdateInterval(50);
      Gyroscope.setUpdateInterval(50);
      DeviceMotion.setUpdateInterval(50);

      // Set sensor updates listeners
      magSubListener.current = Magnetometer.addListener((update) => {
        setMag({
          mag_x: update?.x || 0,
          mag_y: update?.y || 0,
          mag_z: update?.z || 0,
        });
      });

      gyrSubListener.current = Gyroscope.addListener((update) => {
        setGyr({
          gyr_x: update?.x || 0,
          gyr_y: update?.y || 0,
          gyr_z: update?.z || 0,
        });
      });

      devSubListener.current = DeviceMotion.addListener((update) => {
        const { qx, qy, qz, qw } = calcQuaternions(
          update?.rotation?.gamma || 0,
          update?.rotation?.beta || 0,
          update?.rotation?.alpha || 0
        );

        setDevMotion({
          acc_x: update?.acceleration?.x || 0,
          acc_y: update?.acceleration?.y || 0,
          acc_z: update?.acceleration?.z || 0,
          gra_x: update?.accelerationIncludingGravity?.x || 0,
          gra_y: update?.accelerationIncludingGravity?.y || 0,
          gra_z: update?.accelerationIncludingGravity?.z || 0,
          ori_yaw: update?.rotation?.alpha || 0,
          ori_pitch: update?.rotation?.beta || 0,
          ori_roll: update?.rotation?.gamma || 0,
          ori_qx: qx,
          ori_qy: qy,
          ori_qz: qz,
          ori_qw: qw,
        });
      });

      // Algorithm is ready. Begin the ride.
      setIsReady(true);
    };

    beginRide();

    return () => {
      endRide();
    };
  }, []);

  //Handling the 'back' android button
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (isEnded) {
          return;
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert('End the ride?', 'Your ride is still on. Do you want to end it?', [
          {
            text: "Don't leave",
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: 'End',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              navigation.dispatch(e.data.action);
            },
          },
        ]);
      }),
    [navigation, isEnded]
  );

  // Calculate speed and travelled distance for each location update
  useEffect(() => {
    if (location[0] !== null && location[1] !== null) {
      const deltaDist = calcDist(location[0], location[1]);
      const deltaTime = calcTimeDiffMs(location[0], location[1]);
      if (deltaDist < MOMENTARY_DISTANCE_TRESHOLD) {
        travelledDistanceBuffer.current += deltaDist;
        console.log(travelledDistanceBuffer.current);
      }

      const speed = Math.floor((deltaDist / deltaTime) * 3.6);
      if (speed <= SPEED_UPPER_THRESHOLD) {
        if (speed >= SPEED_LOWER_THRESHOLD) setCurrentSpeed(speed);
        else setCurrentSpeed(0);
      }
    }
  }, [location]);

  // Track travelled kilometers
  useEffect(() => {
    setTravelledKm(Math.floor(travelledDistance / 1000));
  }, [travelledDistance]);

  useEffect(() => {
    if (travelledKm !== 0) {
      setEnergy((prev) => prev - bicycle.comfort / 100);
      setDurability((prev) => prev - bicycle.ware / 100);
      setEarnedTokens((prev) => prev + bicycle.efficiency / 100);
    }
  }, [travelledKm]);

  useEffect(() => {
    setTokens(tokens + earnedTokens);
  }, [earnedTokens]);

  useEffect(() => {
    if (durability < bicycle.ware / 100) {
      setIsEnded(true);
    }
  }, [durability]);

  useEffect(() => {
    setEnergyStore(energy);

    if (energy < bicycle.comfort / 100) {
      setIsEnded(true);
    }
  }, [energy]);

  useEffect(() => {
    if (isEnded) {
      navigation.replace<any>('Summary', {
        distance: travelledDistance,
        time: seconds,
        earned: earnedTokens,
      });
    }
  }, [isEnded]);

  return (
    <View style={styles.container}>
      {isReady ? (
        <View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: isBicycle ? 'green' : 'red',
                fontSize: 18,
              }}>
              {isBicycle ? 'Bicycle' : 'Not bicycle'}
            </Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statLabel}>Time Elapsed (mm:ss):</Text>
              <Text style={styles.stat}>
                {`${Math.floor(seconds / 60) % 60}`.padStart(2, '0') +
                  ':' +
                  `${seconds % 60}`.padStart(2, '0')}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statLabel}>Travelled Distance (km):</Text>
              <Text style={styles.stat}>
                {`${Math.floor(travelledDistance / 1000)}`.padStart(2, '0') +
                  '.' +
                  `${Math.floor(travelledDistance / 10) % 100}`.padStart(2, '0')}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statLabel}>Left until update (km):</Text>
              <Text style={styles.stat}>
                {`${Math.floor((1000 - (travelledDistance % 1000)) / 1000)}`.padStart(2, '0') +
                  '.' +
                  `${Math.floor((1000 - (travelledDistance % 1000)) / 10) % 100}`.padStart(2, '0')}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statLabel}>Current Speed (km/h):</Text>
              <Text style={styles.stat}>{currentSpeed}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statLabel}>Energy left:</Text>
              <Text style={styles.stat}>{energy}/10</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statLabel}>Durability:</Text>
              <Text style={styles.stat}>{durability}</Text>
            </View>
            <Button
              title="END!"
              onPress={() => {
                navigation.replace<any>('Summary', {
                  distance: travelledDistance,
                  time: seconds,
                  earned: earnedTokens,
                });
              }}
            />
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  stat: {
    fontSize: 18,
    fontWeight: '500',
  },
});

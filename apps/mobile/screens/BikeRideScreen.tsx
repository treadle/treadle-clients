// Libraries
import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Alert, Button, AppState } from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { Magnetometer, Gyroscope, DeviceMotion } from 'expo-sensors';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import * as tf from '@tensorflow/tfjs';

// Logic
import calcDist from '../logic/calcDist';
import calcTimeDiffMs from '../logic/calcTimeDiffMs';

//inference
import calcQuaternions from '../inference/calcQuaternions';
import executeModel from '../inference/executeModel';
import loadModel from '../inference/loadModel';
import processScanData from '../inference/processScanData';
import calcLoss from '../inference/calcLoss';

// Constants for GPS correction
const UPDATE_DISTANCE = 10;
const MOMENTARY_DISTANCE_TRESHOLD = 100;
const SPEED_UPPER_THRESHOLD = 100;
const SPEED_LOWER_THRESHOLD = 0;

// Inference correction
const UPPER_LOSS_LIMIT = 0.6;
const LOWER_LOSS_LIMIT = 0.2;

const BikeRideScreen = () => {

  // Is app ready?
  const [isReady, setIsReady] = useState(false);

  // Elapsed ride time
  const [seconds, setSeconds] = useState(0);

  // GPS-Tracking
  const [location, setLocation] = useState([null, null]);
  const [travelledDistance, setTravelledDistance] = useState(0);
  const [travelledKm, setTravelledKm] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);

  // Economy
  const [energy, setEnergy] = useState(10);
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

  const lastKmLossesArr = useRef([]);
  const [isBicycle, setIsBicycle] = useState(true);

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

  useEffect(() => {
    console.log(25)
  }, [])

  return (
    <View style={styles.screen}>
      <Text>{}</Text>
    </View>
  );
};

export default BikeRideScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
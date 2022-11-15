import type { TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import type { HomeTabScreenProps, RootStackScreenProps } from '../types/navigation-types';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import { TRDLBContract } from 'treadle-mockup-server';
import Carousel from 'react-native-reanimated-carousel';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import BikeCard from '../components/BikeCard';
import { BN } from 'bn.js';
import { useCounterStore } from '../store/counterStore';
import { useAccountStore } from '../store/useAccountStore';
import { ActivityIndicator, MD3DarkTheme, Snackbar, TouchableRipple } from 'react-native-paper';
import { RobotoBoldText, RobotoMediumText, RobotoRegularText } from '../components/StyledText';
import { useEnergyTokensStore } from '../store/useEnergyTokensStore';
import { getForegroundPermissionsAsync, getProviderStatusAsync, hasServicesEnabledAsync } from 'expo-location';

const errors = [
  "You don't have enough energy to ride this bike!",
  "You didn't allow GPS-Tracking or GPS-Services are inaccessible!",
  "GPS-Precision is too low!",
  "Not enough durability!"
]

const GarageScreen = ({ navigation }: HomeTabScreenProps<'Garage'>) => {
  const [bikes, setBikes] = useState<TRDLBJsonToken[]>([]);
  const [userBike, setUserBike] = useState<TRDLBJsonToken>();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("no error");
  const r = useRef<ICarouselInstance | null>(null);
  const { account } = useAccountStore();
  const { counter } = useCounterStore();
  const { energy } = useEnergyTokensStore();
  const PAGE_WIDTH = Dimensions.get('window').width;

  const fetchAllNFTs = useCallback(async () => {
    if (account) {
      const contract = new TRDLBContract(account, 'dev-1668356929794-27884840521869');

      const options: TRDLBNftTokensForOwnerOptions = {
        account_id: account.accountId,
        from_index: new BN(0),
        limit: 5,
      };

      const nfts: TRDLBJsonToken[] = await contract.nft_tokens_for_owner(options);
      setBikes(nfts);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNFTs();
  }, [counter]);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const handleBikeChange = (index: number) => {
    setUserBike(bikes[index]);
  };

  const handleBikePress = async () => {

      const locationStatus = await getForegroundPermissionsAsync();
      const providerStatus = await hasServicesEnabledAsync();

      const metadata = JSON.parse((userBike?.metadata?.extra || bikes[0].metadata.extra) as string);

      console.log(locationStatus)
      console.log(providerStatus)

      if (!locationStatus.granted || !providerStatus) {
        setError(errors[1])
        onToggleSnackBar();
      } else if ((locationStatus.android?.accuracy && locationStatus.android?.accuracy !== "fine") || (locationStatus.ios?.scope && locationStatus.ios?.scope !== "whenInUse")) {
        setError(errors[2])
        onToggleSnackBar();
      } else if (energy < metadata.comfort / 100) {
        setError(errors[0])
        onToggleSnackBar();
      } else if (metadata.durability < metadata.ware) {
        setError(errors[3])
        onToggleSnackBar();
      } else {
        navigation.navigate<any>('BikeRide', { selectedBike: userBike || bikes[0] });
      }

      console.log(error);
  };

  return (
    <View className="bg-md3-surface flex-1 justify-center items-center">
      {loading ? (
        <ActivityIndicator animating color={MD3DarkTheme.colors.onSurface} size='large' />
      ) : (
        <Fragment>
          <View className="flex-1">
            <Carousel
              defaultIndex={0}
              ref={r}
              width={PAGE_WIDTH}
              data={bikes}
              mode="parallax"
              windowSize={3}
              loop={false}
              renderItem={({ item }) => <BikeCard bikeMetadata={item.metadata} />}
              onSnapToItem={handleBikeChange}
            />
          </View>
          <View className="w-24 h-24 mx-auto mb-16 rounded-full overflow-hidden items-center justify-center bg-md3-primary-container">
            <TouchableRipple
              borderless
              className="w-full h-full items-center justify-center"
              onPress={handleBikePress}>
              <RobotoMediumText className="text-md3-on-primary-container text-[17px]">Race</RobotoMediumText>
            </TouchableRipple>
          </View>
        </Fragment>
      )}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Dismiss',
          onPress: () => {
            // Do something
          },
        }}>
        {error}
      </Snackbar>
    </View>
  );
};

export default GarageScreen;

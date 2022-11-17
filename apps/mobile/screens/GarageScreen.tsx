import type { TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import { TRDLBContract } from 'treadle-mockup-server';
import type { HomeTabScreenProps } from '../types/navigation-types';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, Dimensions, View } from 'react-native';
import BikeCard from '../components/BikeCard';
import { BN } from 'bn.js';
import { useCounterStore } from '../store/counterStore';
import { useAccountStore } from '../store/useAccountStore';
import { ActivityIndicator, MD3DarkTheme, ProgressBar, Snackbar, TouchableRipple } from 'react-native-paper';
import { RobotoMediumText } from '../components/StyledText';
import { useEnergyTokensStore } from '../store/useEnergyTokensStore';
import { getForegroundPermissionsAsync, hasServicesEnabledAsync } from 'expo-location';

const errors = [
  'You don\'t have enough energy to ride this bike!',
  'You didn\'t allow GPS-Tracking or GPS-Services are inaccessible!',
  'GPS-Precision is too low!',
  'Not enough durability!',
];

const limit = 5;

const GarageScreen = ({ navigation }: HomeTabScreenProps<'Garage'>) => {
  const appState = useRef(AppState.currentState);
  const [bikes, setBikes] = useState<TRDLBJsonToken[]>([]);
  const [userBike, setUserBike] = useState<TRDLBJsonToken>();
  const [visible, setVisible] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingBikes, setLoadingBikes] = useState(false);
  const [index, setIndex] = useState(0);
  const [lastBikesRetrievedLength, setLastBikesRetrievedLength] = useState(0);
  const [error, setError] = useState('no error');
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
        from_index: new BN(index).toString(),
        limit,
      };

      const nfts: TRDLBJsonToken[] = await contract.nft_tokens_for_owner(options);

      setLastBikesRetrievedLength(nfts.length);
      setBikes((prevState) => [...prevState, ...nfts]);
      setInitialLoading(false);
    }
  }, [index, appState, account, counter]);

  useEffect(() => {
    fetchAllNFTs().then(() => setLoadingBikes(false));
  }, [counter, index, appState, account]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription.remove();
  }, []);

  const handleAppStateChange = (nextAppChange: AppStateStatus) => {
    if (nextAppChange !== 'active') {
      setIndex(0);
      setBikes([]);
    }

    appState.current = nextAppChange;
  };

  const handleToggleSnackBar = () => setVisible(!visible);

  const handleDismissSnackBar = () => setVisible(false);

  const handleBikeChange = (index: number) => {
    setUserBike(bikes[index]);
  };

  const loadMoreBikes = () => {
    setIndex((prev) => prev + 5);
    setLoadingBikes(true);
  };

  const handleBikePress = async () => {
    const locationStatus = await getForegroundPermissionsAsync();
    const providerStatus = await hasServicesEnabledAsync();

    const metadata = JSON.parse((userBike?.metadata?.extra || bikes[0].metadata.extra) as string);

    if (!locationStatus.granted || !providerStatus) {
      setError(errors[1]);
      handleToggleSnackBar();
    } else if (
      (locationStatus.android?.accuracy && locationStatus.android?.accuracy !== 'fine') ||
      (locationStatus.ios?.scope && locationStatus.ios?.scope !== 'whenInUse')
    ) {
      setError(errors[2]);
      handleToggleSnackBar();
    } else if (energy < metadata.comfort / 100) {
      setError(errors[0]);
      handleToggleSnackBar();
    } else if (metadata.durability < metadata.ware) {
      setError(errors[3]);
      handleToggleSnackBar();
    } else {
      navigation.navigate<any>('BikeRide', { selectedBike: userBike || bikes[0] });
    }
  };

  return (
    <>
      {loadingBikes && <ProgressBar indeterminate />}
      <View className='bg-md3-surface flex-1 justify-center items-center'>
        {initialLoading ? (
          <ActivityIndicator animating color={MD3DarkTheme.colors.onSurface} size='large' />
        ) : (
          <>
            <View className='flex-1'>
              <Carousel
                defaultIndex={0}
                ref={r}
                width={PAGE_WIDTH}
                data={bikes}
                mode='parallax'
                windowSize={3}
                loop={false}
                renderItem={({ item }) => <BikeCard bikeMetadata={item.metadata} />}
                onSnapToItem={handleBikeChange}
                onScrollEnd={() => {
                  if (lastBikesRetrievedLength === limit && appState.current === 'active') {
                    loadMoreBikes();
                  } else {
                    return null;
                  }
                }}
              />
            </View>
            <View
              className='w-24 h-24 mx-auto mb-16 rounded-full overflow-hidden items-center justify-center bg-md3-primary'>
              <TouchableRipple
                borderless
                className='w-full h-full items-center justify-center'
                onPress={handleBikePress}>
                <RobotoMediumText className='text-md3-on-primary text-[17px]'>Race</RobotoMediumText>
              </TouchableRipple>
            </View>
          </>
        )}
        <Snackbar
          visible={visible}
          onDismiss={handleDismissSnackBar}
          action={{
            label: 'Dismiss',
            onPress: () => {
              // Do something
            },
          }}>
          {error}
        </Snackbar>
      </View>
    </>
  );
};

export default GarageScreen;

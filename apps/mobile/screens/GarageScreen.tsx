import type { TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import { TRDLBContract } from 'treadle-mockup-server';
import type { HomeTabScreenProps } from '../types/navigation-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, View } from 'react-native';
import { BN } from 'bn.js';
import { useCounterStore } from '../store/counterStore';
import { useAccountStore } from '../store/useAccountStore';
import { ActivityIndicator, MD3DarkTheme, ProgressBar, Snackbar, TouchableRipple } from 'react-native-paper';
import { useEnergyTokensStore } from '../store/useEnergyTokensStore';
import { getForegroundPermissionsAsync, hasServicesEnabledAsync } from 'expo-location';
import { useIsFocused } from '@react-navigation/native';
import GarageCarousel from '../components/GarageCarousel';
import { useBikeStore } from '../store/useBikeStore';
import EmptyCollection from '../components/EmptyCollection';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const errors = [
  'You don\'t have enough energy to ride this bike!',
  'You didn\'t allow GPS-Tracking or GPS-Services are inaccessible!',
  'GPS-Precision is too low!',
  'Not enough durability!',
];

const limit = 5;

const GarageScreen = ({ navigation }: HomeTabScreenProps<'Garage'>) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [bikes, setBikes] = useState<TRDLBJsonToken[]>([]);
  const [isEmptyCollection, setIsEmptyCollection] = useState(false);
  const [visible, setVisible] = useState(false);
  const [nftSupplyForOwner, setNftSupplyForOwner] = useState(-1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingBikes, setLoadingBikes] = useState(false);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState('no error');
  const { account } = useAccountStore();
  const { counter } = useCounterStore();
  const { energy } = useEnergyTokensStore();
  const { selectedBike } = useBikeStore();
  const isFocused = useIsFocused();

  const fetchAllNFTs = async () => {
    if (account) {
      const contract = new TRDLBContract(account, 'dev-1668823343153-42376084286451');

      const options: TRDLBNftTokensForOwnerOptions = {
        account_id: account.accountId,
        from_index: new BN(index).toString(),
        limit,
      };

      const nfts: TRDLBJsonToken[] = await contract.nft_tokens_for_owner(options);

      setBikes((prevState) => [...prevState, ...nfts]);
      setInitialLoading(false);
    }
  };

  const fetchNftSupplyForOwner = async () => {
    if (account) {
      const contract = new TRDLBContract(account, 'dev-1668823343153-42376084286451');

      const response = await contract.nft_supply_for_owner({
        account_id: account.accountId,
      });

      return Number(response);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchNftSupplyForOwner()
        .then((supply) => {
          setNftSupplyForOwner(supply);
          if (supply === 0) {
            setIsEmptyCollection(true);
          }
        });
      fetchAllNFTs().then(() => setLoadingBikes(false));
    }
  }, [counter, index, appStateVisible, account, isFocused]);

  useEffect(() => {
    if (!isFocused) {
      setIndex(0);
      setBikes([]);
      setInitialLoading(true);
      setIsEmptyCollection(false);
    }
  }, [isFocused]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription.remove();
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      setInitialLoading(true);
      setIndex(0);
      setBikes([]);
      setIsEmptyCollection(false);
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  const handleToggleSnackBar = () => setVisible(!visible);

  const handleDismissSnackBar = () => setVisible(false);

  const loadMoreBikes = () => {
    setLoadingBikes(true);
    setTimeout(() => {
      setIndex((prev) => prev + 5);
    }, 4000);
  };

  const handleRidePress = async () => {
    const locationStatus = await getForegroundPermissionsAsync();
    const providerStatus = await hasServicesEnabledAsync();

    const metadata = JSON.parse((selectedBike?.metadata?.extra || bikes[0].metadata.extra) as string);

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
      navigation.navigate<any>('BikeRide', { selectedBike: selectedBike || bikes[0] });
    }
  };

  return (
    <>
      <ProgressBar indeterminate visible={loadingBikes} />
      <View className='bg-md3-surface flex-1'>
        {initialLoading
          ? (
            <View className='flex-1 justify-center items-center'>
              <ActivityIndicator animating color={MD3DarkTheme.colors.onSurface} size='large' />
            </View>
          )
          : isEmptyCollection ? (
            <EmptyCollection />
          ) : (
            <View className='flex-1'>
              <GarageCarousel
                bikes={bikes}
                loadMoreBikes={loadMoreBikes}
                nftSupplyForOwner={nftSupplyForOwner}
                isBikesLoading={loadingBikes}
              />
              <View
                className='w-24 h-24 mx-auto mb-16 rounded-full overflow-hidden items-center justify-center bg-md3-primary'>
                <TouchableRipple
                  borderless
                  className='flex-1 items-center justify-center'
                  onPress={handleRidePress}>
                  <MaterialCommunityIcons name='play' size={48} color={MD3DarkTheme.colors.onPrimary} />
                </TouchableRipple>
              </View>
            </View>
          )
        }
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

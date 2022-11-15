import type { TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import { TRDLBContract } from 'treadle-mockup-server';
import type { HomeTabScreenProps } from '../types/navigation-types';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import BikeCard from '../components/BikeCard';
import { BN } from 'bn.js';
import { useCounterStore } from '../store/counterStore';
import { useAccountStore } from '../store/useAccountStore';
import { ActivityIndicator, MD3DarkTheme, Snackbar, TouchableRipple } from 'react-native-paper';
import { RobotoRegularText } from '../components/StyledText';
import { useEnergyTokensStore } from '../store/useEnergyTokensStore';

const GarageScreen = ({ navigation }: HomeTabScreenProps<'Garage'>) => {
  const [bikes, setBikes] = useState<TRDLBJsonToken[]>([]);
  const [userBike, setUserBike] = useState<TRDLBJsonToken>();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const handleBikePress = () => {
    const metadata = JSON.parse((userBike?.metadata?.extra || bikes[0].metadata.extra) as string);
    if (energy < metadata.comfort / 100) {
      onToggleSnackBar();
    } else {
      navigation.navigate<any>('BikeRide', { selectedBike: userBike || bikes[0] });
    }
  };

  return (
    <View className="bg-md3-surface flex-1 justify-center items-center">
      {loading ? (
        <ActivityIndicator animating color={MD3DarkTheme.colors.onSurface} size='large' />
      ) : (
        <>
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
          <View className="w-24 h-24 mx-auto mb-16 rounded-full overflow-hidden items-center justify-center bg-md3-primary">
            <TouchableRipple
              borderless
              className="w-full h-full items-center justify-center"
              onPress={handleBikePress}>
              <RobotoRegularText className="text-md3-on-primary">Race</RobotoRegularText>
            </TouchableRipple>
          </View>
        </>
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
        You don't have enough energy to ride this bike!
      </Snackbar>
    </View>
  );
};

export default GarageScreen;

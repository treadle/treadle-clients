import type { TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import type { RootStackScreenProps } from '../types/navigation-types';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import { TRDLBContract } from 'treadle-mockup-server';
import Carousel from 'react-native-reanimated-carousel';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, View, Alert } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import BikeCard from '../components/BikeCard';
import { BN } from 'bn.js';
import { useCounterStore } from '../store/counterStore';
import { useAccountStore } from '../store/useAccountStore';
import { TouchableRipple } from 'react-native-paper';
import { RobotoRegularText } from '../components/StyledText';
import { useEnergyTokensStore } from '../store/useEnergyTokensStore';

const GarageScreen = ({ navigation }: RootStackScreenProps<'BikeRide'>) => {
  const PAGE_WIDTH = Dimensions.get('window').width;
  const r = useRef<ICarouselInstance | null>(null);
  const { account } = useAccountStore();
  const [bikes, setBikes] = useState<TRDLBJsonToken[]>([]);
  const [userBike, setUserBike] = useState<TRDLBJsonToken>();
  const { counter } = useCounterStore();
  const { energy, setEnergy } = useEnergyTokensStore();

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
    }
  }, []);

  const handleBikeChange = (index: number) => {
    setUserBike(bikes[index]);
  };

  const handleBikePress = () => {
    console.warn(navigation);
    const metadata = JSON.parse(userBike?.metadata?.extra || bikes[0].metadata.extra)
    if (energy < metadata.comfort / 100) {
      Alert.alert("Can't start the ride", "You don't have enough energy to ride this bike!");
    } else {
      navigation.navigate('BikeRide', { selectedBike: userBike || bikes[0] });
    }
  };

  useEffect(() => {
    fetchAllNFTs();
  }, [counter]);
  return (
    <View className='bg-md3-surface flex-1'>
      <View className='flex-1 p-0 m-0'>
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
        />
      </View>
      <View className="w-24 h-24 mx-auto mb-16 rounded-full overflow-hidden items-center justify-center bg-md3-primary-container">
        <TouchableRipple
          borderless
          className='w-full h-full items-center justify-center'
          onPress={handleBikePress}>
          <RobotoRegularText className='text-md3-on-primary-container'>
            Race
          </RobotoRegularText>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default gestureHandlerRootHOC(GarageScreen);

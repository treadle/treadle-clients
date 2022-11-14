import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Text, View, Button } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import BikeCard from '../components/BikeCard';
import { TRDLBContract, TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import { BN } from 'bn.js';
import { useCounterStore } from '../store/counterStore';
import { useAccountStore } from '../store/useAccountStore';

import { RootStackScreenProps } from '../types';

const GarageScreen = ({ navigation }: RootStackScreenProps<'BikeRide'>) => {
  const PAGE_WIDTH = Dimensions.get('window').width;
  const r = useRef<ICarouselInstance | null>(null);
  const { account } = useAccountStore();
  const [bikes, setBikes] = useState<TRDLBJsonToken[]>([]);
  const [userBike, setUserBike] = useState(0);
  const { counter } = useCounterStore();

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

  useEffect(() => {
    fetchAllNFTs();
  }, [counter]);
  return (
    <View className='bg-md3-surface flex-1'>
      <View className='w-full flex-1'>
        <Carousel
          defaultIndex={0}
          ref={r}
          width={PAGE_WIDTH}
          data={bikes}
          mode='parallax'
          windowSize={3}
          loop={false}
          renderItem={({ item }) => <BikeCard bikeMetadata={item.metadata} />}
          onSnapToItem={(index) => setUserBike(index)}
        />
      </View>
      <Button title={userBike.toString()} onPress={() => navigation.navigate('BikeRide')}/>
    </View>
  );
};

export default gestureHandlerRootHOC(GarageScreen);

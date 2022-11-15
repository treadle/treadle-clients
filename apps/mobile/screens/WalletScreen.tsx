import type { TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import type { HomeTabScreenProps, RootStackScreenProps } from '../types/navigation-types';
import { TRDLBContract } from 'treadle-mockup-server';
import { FlatList, Pressable, View } from 'react-native';
import { useAccountStore } from '../store/useAccountStore';
import { useCallback, useEffect, useState } from 'react';
import { BN } from 'bn.js';
import { useCounterStore } from '../store/counterStore';
import { Button } from 'react-native-paper';
import { RobotoRegularText } from '../components/StyledText';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';

function WalletScreen({ navigation }: HomeTabScreenProps<'Wallet'>) {
  const { account } = useAccountStore();
  const { counter } = useCounterStore();
  const isFocused = useIsFocused();
  const [index, setIndex] = useState(0);
  const [lastNftsRetrievedLength, setLastNftsRetrievedLength] = useState(0);
  const [nfts, setNfts] = useState<TRDLBJsonToken[]>([]);

  const fetchAllNFTs = useCallback(async () => {
    if (account) {
      const contract = new TRDLBContract(account, 'dev-1668356929794-27884840521869');

      const options: TRDLBNftTokensForOwnerOptions = {
        account_id: account.accountId,
        from_index: (new BN(index)).toString(),
        limit: 10,
      };

      const nfts: TRDLBJsonToken[] = await contract.nft_tokens_for_owner(options);

      setLastNftsRetrievedLength(nfts.length);
      setNfts((prevState) => [...prevState, ...nfts]);
    }
  }, [index, isFocused]);

  useEffect(() => {
    if (isFocused) {
      fetchAllNFTs();
    }
  }, [counter, index, isFocused]);

  useEffect(() => {
    if (!isFocused) {
      setNfts([]);
      setIndex(0);
    }
  }, [isFocused]);

  const NftCardHandler = (item: TRDLBJsonToken) => {
    navigation.navigate<RootStackScreenProps<'NftDetails'> | any>('NftDetails', { nft: item });
  };

  const loadMoreHandler = () => {
    setIndex((prev) => prev + 10);
  };

  const renderItem = ({ item }: { item: TRDLBJsonToken }) => {
    return (
      <View className='m-4 border-2 border-md3-outline-variant rounded-[12px] overflow-hidden'>
        <Pressable onPress={() => NftCardHandler(item)}>
          <View>
            {item.metadata.media && (
              <FastImage className='w-[140px] h-[140px]' source={{ uri: item.metadata.media }} />
            )}
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View className='px-4 bg-md3-surface flex-1 items-center'>
      <FlatList
        data={nfts}
        renderItem={renderItem}
        keyExtractor={(item) => item.token_id}
        numColumns={2}
        className='mb-2'
      />
      {lastNftsRetrievedLength === 10 && (
        <Button className='bg-md3-primary' onPress={loadMoreHandler}>
          <RobotoRegularText className='text-md3-on-primary'>Load More</RobotoRegularText>
        </Button>
      )}
    </View>
  );
}

export default WalletScreen;

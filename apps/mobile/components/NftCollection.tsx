import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import { TRDLBContract } from 'treadle-mockup-server';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Button, MD3DarkTheme } from 'react-native-paper';
import { RobotoRegularText } from './StyledText';
import { useAccountStore } from '../store/useAccountStore';
import { useCounterStore } from '../store/counterStore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BN } from 'bn.js';
import NftCard from './NftCard';
import EmptyCollection from './EmptyCollection';

const limit = 10;

const NftCollection: FC = () => {
  const navigation = useNavigation();
  const { account } = useAccountStore();
  const { counter } = useCounterStore();
  const isFocused = useIsFocused();
  const [index, setIndex] = useState(0);
  const [lastNftsRetrievedLength, setLastNftsRetrievedLength] = useState(0);
  const [nfts, setNfts] = useState<TRDLBJsonToken[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchAllNFTs = useCallback(async () => {
    if (account) {
      const contract = new TRDLBContract(account, 'dev-1668356929794-27884840521869');

      const options: TRDLBNftTokensForOwnerOptions = {
        account_id: account.accountId,
        from_index: new BN(index).toString(),
        limit,
      };

      const nfts: TRDLBJsonToken[] = await contract.nft_tokens_for_owner(options);

      setLastNftsRetrievedLength(nfts.length);
      setNfts((prevState) => [...prevState, ...nfts]);
      setInitialLoading(false);
    }
  }, [index, isFocused, account]);

  useEffect(() => {
    if (isFocused) {
      fetchAllNFTs();
    }
  }, [counter, index, isFocused, account]);

  useEffect(() => {
    if (!isFocused) {
      setNfts([]);
      setIndex(0);
    }
  }, [isFocused]);

  const loadMoreHandler = () => {
    setIndex((prev) => prev + 10);
  };

  const renderItem = ({ item }: { item: TRDLBJsonToken }) => {
    return (
      <NftCard nft={item} navigation={navigation} />
    );
  };

  const InitialLoading = () => {
    if (initialLoading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator animating color={MD3DarkTheme.colors.onSurface} size="large" />
        </View>
      );
    }

    if (nfts.length <= 0 && !initialLoading) {
      return (
        <View className="flex-1 justify-center items-center">
          <EmptyCollection />
        </View>
      );
    }

    return (
      <FlatList
        data={nfts}
        renderItem={renderItem}
        keyExtractor={(item) => item.token_id}
        numColumns={2}
        className="mb-2"
      />
    );
  };

  return (
    <View className='px-4 bg-md3-surface flex-1'>
      <InitialLoading />
      {lastNftsRetrievedLength === limit && (
        <Button className='bg-md3-primary' onPress={loadMoreHandler}>
          <RobotoRegularText className='text-md3-on-primary'>Load More</RobotoRegularText>
        </Button>
      )}
    </View>
  );
};

export default NftCollection;

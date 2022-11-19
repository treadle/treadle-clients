import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import { TRDLBContract } from 'treadle-mockup-server';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Button, MD3DarkTheme } from 'react-native-paper';
import { RobotoMediumText, RobotoRegularText } from './StyledText';
import { useAccountStore } from '../store/useAccountStore';
import { useCounterStore } from '../store/counterStore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BN } from 'bn.js';
import NftCard from './NftCard';
import EmptyCollection from './EmptyCollection';

const limit = 10;

const NftCollection: FC = () => {
  const [nftSupplyForOwner, setNftSupplyForOwner] = useState(-1);
  const [index, setIndex] = useState(0);
  const [isLoadingNewBikes, setIsLoadingNewBikes] = useState(false);
  const [nfts, setNfts] = useState<TRDLBJsonToken[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isEmptyCollection, setIsEmptyCollection] = useState(false);
  const navigation = useNavigation();
  const { account } = useAccountStore();
  const { counter } = useCounterStore();
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

      setNfts((prevState) => [...prevState, ...nfts]);
      setInitialLoading(false);
    }
  }

  const fetchNftSupplyForOwner = async () => {
    if (account) {
      const contract = new TRDLBContract(account, 'dev-1668823343153-42376084286451');

      const response = await contract.nft_supply_for_owner({
        account_id: account.accountId,
      });

      return Number(response);
    }
  }

  useEffect(() => {
    if (isFocused) {
      fetchNftSupplyForOwner()
        .then((supply) => {
          setNftSupplyForOwner(supply);
          if (supply === 0) {
            setIsEmptyCollection(true);
          }
        });
      fetchAllNFTs().then(() => setIsLoadingNewBikes(false));
    }
  }, [counter, index, isFocused, account]);

  useEffect(() => {
    if (!isFocused) {
      setNfts([]);
      setIndex(0);
      setInitialLoading(true);
      setIsEmptyCollection(false);
    }
  }, [isFocused]);

  const loadMoreHandler = () => {
    setIndex((prev) => prev + 10);
    setIsLoadingNewBikes(true);
  };

  const renderItem = ({ item }: { item: TRDLBJsonToken }) => {
    return (
      <NftCard nft={item} navigation={navigation} />
    );
  };

  return (
    <View className='px-4 bg-md3-surface justify-center flex-1'>
      {initialLoading
        ? (
          <View className='flex-1 justify-center items-center'>
            <ActivityIndicator animating color={MD3DarkTheme.colors.onSurface} size='large' />
          </View>
        )
        : isEmptyCollection
          ? (
            <View className='flex-1 justify-center items-center'>
              <EmptyCollection />
            </View>
          )
          : (
            <View className='flex-1 justify-center items-center'>
              <FlatList
                data={nfts}
                renderItem={renderItem}
                keyExtractor={(item) => item.token_id}
                numColumns={2}
                className='mb-2'
              />
            </View>
          )
      }
      {nftSupplyForOwner !== nfts.length && (
        <Button
          mode="contained"
          disabled={isLoadingNewBikes}
          loading={isLoadingNewBikes}
          onPress={loadMoreHandler}>
          <RobotoMediumText
            className={`text-[14px] tracking-[0.1px] ${
              isLoadingNewBikes ? 'text-md3-on-surface' : 'text-md3-on-primary'
            }`}>
            {isLoadingNewBikes ? 'Loading...' : 'Load more'}
          </RobotoMediumText>
        </Button>
      )}
    </View>
  );
};

export default NftCollection;

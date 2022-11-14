import type { TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import type { HomeTabScreenProps } from '../types/navigation-types';
import { Button, FlatList, Image, Pressable, View } from 'react-native';
import { useAccountStore } from '../store/useAccountStore';
import { useCallback, useEffect, useState } from 'react';
import { TRDLBContract } from 'treadle-mockup-server';
import { BN } from 'bn.js';
import { useCounterStore } from '../store/counterStore';
import { useNftDetailsStore } from '../store/useNftDetailsStore';

function WalletScreen({ navigation }: HomeTabScreenProps<'Wallet'>) {
  const { setAccount, account } = useAccountStore();
  const { counter } = useCounterStore();
  const { setNftDetails } = useNftDetailsStore();
  const [nfts, setNfts] = useState<TRDLBJsonToken[]>([]);

  const fetchAllNFTs = useCallback(async () => {
    if (account) {
      const contract = new TRDLBContract(account, 'dev-1668356929794-27884840521869');

      const options: TRDLBNftTokensForOwnerOptions = {
        account_id: account.accountId,
        from_index: new BN(0),
        limit: 5,
      };

      const nfts: TRDLBJsonToken[] = await contract.nft_tokens_for_owner(options);

      setNfts(nfts);
    }
  }, []);

  useEffect(() => {
    fetchAllNFTs();
  }, [counter]);

  const NftCardHandler = (item: TRDLBJsonToken) => {
    setNftDetails(item);

    // @ts-ignore
    navigation.navigate('NftDetails');
  };

  const renderItem = ({ item }: { item: TRDLBJsonToken }) => {
    return (
      <View className='p-4 m-1 border border-md3-outline-variant rounded-[12px]'>
        <Pressable onPress={() => NftCardHandler(item)}>
          <View>
            {item.metadata.media && (
              <Image className='w-[140px] h-[140px]' source={{ uri: item.metadata.media }} />
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
        // ItemSeparatorComponent={() => <View className='h-4' />}
      />
      <Button title={'Sign Out'} onPress={() => setAccount(null)} />
    </View>
  );
}

export default WalletScreen;

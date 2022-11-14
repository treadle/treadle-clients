import { Button, FlatList, Image, Pressable, View } from 'react-native';
import { useAccountStore } from '../store/useAccountStore';
import { useCallback, useEffect, useState } from 'react';
import { TRDLBContract, TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import { BN } from 'bn.js';
import { useCounterStore } from '../store/counterStore';
import { useNftDetailsStore } from '../store/useNftDetailsStore';
import { HomeTabScreenProps } from '../types';

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
      console.log(nfts.length);
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
      <View className='m-5'>
        <Pressable onPress={() => NftCardHandler(item)}>
          <View>
            {item.metadata.media && <Image className='w-[140px] h-[140px]' source={{ uri: item.metadata.media }} />}
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View className='px-4 bg-md3-surface flex-1 items-center'>
      <FlatList data={nfts} renderItem={renderItem} numColumns={2} />
      <Button title={'Sign Out'} onPress={() => setAccount(null)} />
    </View>
  );
};

export default WalletScreen;

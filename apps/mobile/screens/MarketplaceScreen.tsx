import type { FC } from 'react';
import { FlatList, View } from 'react-native';
import MarketplaceCard from '../components/MarketplaceCard';
import {
  TRDLBContract,
  TRDLBJsonTokenMetadata,
  TRDLBNftMintOptions,
  TRDLBTokenMetadataExtra,
} from 'treadle-mockup-server';
import { useAccountStore } from '../store/useAccountStore';

const extra: TRDLBTokenMetadataExtra = {
  durability: 10000, // 100.00 units
  ware: 100, // 1.00 unit burnt per kilometre travelled
  efficiency: 500, // 5.00 tokens earned per energy consumed
  comfort: 200, // 2.00 energy consumed per kilometre travelled
};

const metadata: TRDLBJsonTokenMetadata[] = [
  {
    title: 'City Bike',
    description: 'A simple bike for travelling across your hometown',
    media: 'https://miro.medium.com/max/775/0*rZecOAy_WVr16810',
    extra: JSON.stringify({
      durability: 10000, // 100.00 units
      ware: 100, // 1.00 unit burnt per kilometre travelled
      efficiency: 500, // 5.00 tokens earned per energy consumed
      comfort: 200, // 2.00 energy consumed per kilometre travelled
    }),
  },
  {
    title: 'Mountain Bike',
    description: 'A bike for travelling across the mountains',
    media: 'https://www.w3schools.com/w3css/img_lights.jpg',
    extra: JSON.stringify({
      durability: 10000, // 100.00 units
      ware: 100, // 1.00 unit burnt per kilometre travelled
      efficiency: 500, // 5.00 tokens earned per energy consumed
      comfort: 250, // 2.50 energy consumed per kilometre travelled
    }),
  },
  {
    title: 'Road Bike',
    description: 'A bike for travelling across the roads',
    media: 'https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE',
    extra: JSON.stringify({
      durability: 10000, // 100.00 units
      ware: 100, // 1.00 unit burnt per kilometre travelled
      efficiency: 700, // 7.00 tokens earned per energy consumed
      comfort: 100, // 1.00 energy consumed per kilometre travelled
    }),
  },
];

const MarketplaceScreen: FC = () => {
  const { account, masterAccount } = useAccountStore();

  const mintBike = async (bikeMetadata: TRDLBJsonTokenMetadata) => {
    if (masterAccount && account) {
      const contract = new TRDLBContract(masterAccount, 'dev-1668356929794-27884840521869');

      const options: TRDLBNftMintOptions = {
        receiver_id: account.accountId,
        metadata: bikeMetadata,
      };

      await contract.nft_mint(options);
    }
  };

  const renderItem = ({ item }: { item: TRDLBJsonTokenMetadata }) => (
    <MarketplaceCard mintBike={() => mintBike(item)} bikeMetadata={item} />
  );

  return (
    <View className="bg-md3-surface flex-1 px-4">
      <FlatList data={metadata} renderItem={renderItem} />
    </View>
  );
};

export default MarketplaceScreen;

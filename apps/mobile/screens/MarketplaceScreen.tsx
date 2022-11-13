import type { FC } from 'react';
import { View } from 'react-native';
import MarketPlaceCard from '../components/MarketPlaceCard';

const MarketplaceScreen: FC = () => {
  return (
    <View className='bg-md3-surface flex-1 px-2'>
      <MarketPlaceCard />
    </View>
  );
};

export default MarketplaceScreen;

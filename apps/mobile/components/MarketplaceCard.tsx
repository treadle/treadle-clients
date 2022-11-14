import type { FC } from 'react';
import { useState } from 'react';
import { Button, MD3DarkTheme } from 'react-native-paper';
import { RobotoMediumText, RobotoRegularText } from './StyledText';
import { Image, View } from 'react-native';
import { TRDLBJsonTokenMetadata } from 'treadle-mockup-server';
import { useCounterStore } from '../store/counterStore';

interface CardProps {
  bikeMetadata: TRDLBJsonTokenMetadata;
  mintBike: () => void;
}

const MarketplaceCard: FC<CardProps> = ({ bikeMetadata, mintBike }) => {
  const { counter, increment } = useCounterStore();
  const [prevCounter, setPrevCounter] = useState<number | null>(null);

  const handleMintBike = async () => {
    setPrevCounter(counter);
    await mintBike();
    increment();
  };

  return (
    <View className="bg-md3-surface rounded-[12px] overflow-hidden border border-md3-outline-variant mb-4">
      {bikeMetadata.media && (
        <Image source={{ uri: bikeMetadata.media }} className="w-full h-[188px]" />
      )}
      <View className="p-4">
        <View className="flex-row mb-[32px]">
          <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
            {bikeMetadata.title}
          </RobotoRegularText>
        </View>
        <View className="flex-row mb-[32px]">
          <RobotoRegularText className="text-md3-on-surface-variant text-[14px] tracking-[0.25px]">
            {bikeMetadata.description}
          </RobotoRegularText>
        </View>
        <View className="flex-row mb-[32px]">
          <RobotoRegularText className="text-md3-on-surface-variant text-[14px] tracking-[0.25px]">
            {bikeMetadata.extra}
          </RobotoRegularText>
        </View>
        <View className="flex-row">
          <Button
            onPress={handleMintBike}
            disabled={prevCounter === counter}
            loading={prevCounter === counter}
            mode="contained"
            theme={MD3DarkTheme}
            className="w-full">
            <RobotoMediumText
              className={`text-[14px] tracking-[0.1px] ${
                prevCounter === counter ? 'text-md3-on-surface' : 'text-md3-on-primary'
              }`}>
              {prevCounter === counter ? 'Minting...' : 'Mint'}
            </RobotoMediumText>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default MarketplaceCard;

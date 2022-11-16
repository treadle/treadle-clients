import type { FC } from 'react';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import { RobotoMediumText, RobotoRegularText } from './StyledText';
import FastImage from 'react-native-fast-image';
import { View } from 'react-native';
import { TRDLBJsonTokenMetadata } from 'treadle-mockup-server';
import { useCounterStore } from '../store/counterStore';
import { Divider } from "react-native-paper"

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

  const stats = JSON.parse(bikeMetadata.extra as string)

  return (
    <View className="bg-md3-surface rounded-[12px] overflow-hidden border border-md3-outline-variant mb-4">
      {bikeMetadata.media && (
        <FastImage source={{ uri: bikeMetadata.media }} className="w-full h-[188px]" />
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
        <View className="flex-col mb-[32px]">
          <RobotoRegularText className="text-[14px] text-md3-on-surface px-[2px] leading-[16px]">
            Durability: {stats.durability / 100} unit{stats.durability / 100 > 1 ? "s" : ""}
          </RobotoRegularText>
          <Divider bold className="w-full my-4" />
          <RobotoRegularText className="text-[14px] text-md3-on-surface px-[2px] leading-[16px]">
            Ware: {stats.ware / 100} durability unit{stats.ware / 100 > 1 ? "s" : ""} per kilometre travelled
          </RobotoRegularText>
          <Divider bold className="w-full my-4" />
          <RobotoRegularText className="text-[14px] text-md3-on-surface px-[2px] leading-[16px]">
            Efficiency: {stats.efficiency / 100} $SCRW per kilometre travelled
          </RobotoRegularText>
          <Divider bold className="w-full my-4" />
          <RobotoRegularText className="text-[14px] text-md3-on-surface px-[2px] leading-[16px]">
            Comfort: {stats.comfort / 100} energy unit{stats.comfort / 100 > 1 ? "s" : ""} spent per kilometre travelled
          </RobotoRegularText>
        </View>
        <View className="flex-row">
          <Button
            onPress={handleMintBike}
            disabled={prevCounter === counter}
            loading={prevCounter === counter}
            mode="contained"
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

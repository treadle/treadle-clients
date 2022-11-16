import type { FC } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RobotoRegularText } from './StyledText';
import { TRDLBJsonTokenMetadata } from 'treadle-mockup-server';

interface CardProps {
  bikeMetadata: TRDLBJsonTokenMetadata;
}

const BikeCard: FC<CardProps> = ({ bikeMetadata }) => {
  return (
    <View className="bg-md3-surface flex-1 items-center rounded-[12px] overflow-hidden border border-md3-outline-variant">
      {bikeMetadata.media && (
        <FastImage source={{ uri: bikeMetadata.media }} className="w-full h-[188px]" />
      )}
      <View className="p-4">
        <View className="flex-row mb-[32px]">
          <RobotoRegularText className="text-md3-on-bg text-[22px] tracking-[0.5px]">
            {bikeMetadata.title}
          </RobotoRegularText>
        </View>
        <View className="flex flex-row items-center">
          <RobotoRegularText className="text-[16px] text-md3-on-surface px-[2px] leading-[20px]">
            {bikeMetadata.extra}
          </RobotoRegularText>
        </View>
      </View>
    </View>
  );
};

export default BikeCard;

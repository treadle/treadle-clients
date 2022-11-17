import type { FC } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RobotoRegularText } from './StyledText';
import { TRDLBJsonTokenMetadata } from 'treadle-mockup-server';
import { ProgressBar } from 'react-native-paper';

interface CardProps {
  bikeMetadata: TRDLBJsonTokenMetadata;
}

const BikeCard: FC<CardProps> = ({ bikeMetadata }) => {
  const stats = JSON.parse(bikeMetadata.extra as string);
  const durabilityPercentage = stats.durability / 200
  const warePercentage = 110 - stats.ware / 10
  const efficiencyPercentage = stats.efficiency / 10
  const comfortPercentage = 110 - stats.comfort / 10

  return (
    <View className="bg-md3-surface flex-1 items-center rounded-[12px] overflow-hidden border border-md3-outline-variant">
      {bikeMetadata.media && (
        <FastImage source={{ uri: bikeMetadata.media }} className="w-full h-[188]" />
      )}
      <View className="p-4">
        <View className="flex-row mb-[16px]">
          <RobotoRegularText className="text-md3-on-bg text-[22px] tracking-[0.5px]">
            {bikeMetadata.title}
          </RobotoRegularText>
        </View>
        <View className="flex-col justify-evenly">
          <RobotoRegularText className="text-[14px] text-md3-on-surface px-[2px] leading-[16px]">
            Durability: {stats.durability / 100} unit{stats.durability / 100 > 1 ? 's' : ''}
          </RobotoRegularText>
          <ProgressBar className='w-full my-3' progress={durabilityPercentage / 100}/>
          <RobotoRegularText className="text-[14px] text-md3-on-surface px-[2px] leading-[16px]">
            Ware: {stats.ware / 100} durability unit{stats.ware / 100 > 1 ? 's' : ''} per kilometre
            travelled
          </RobotoRegularText>
          <ProgressBar className='w-full my-3' progress={warePercentage / 100}/>
          <RobotoRegularText className="text-[14px] text-md3-on-surface px-[2px] leading-[16px]">
            Efficiency: {stats.efficiency / 100} $SCRW per kilometre travelled
          </RobotoRegularText>
          <ProgressBar className='w-full my-3' progress={efficiencyPercentage / 100}/>
          <RobotoRegularText className="text-[14px] text-md3-on-surface px-[2px] leading-[16px]">
            Comfort: {stats.comfort / 100} energy unit{stats.comfort / 100 > 1 ? 's' : ''} spent per
            kilometre travelled
          </RobotoRegularText>
          <ProgressBar className='w-full my-3' progress={comfortPercentage / 100}/>
        </View>
      </View>
    </View>
  );
};

export default BikeCard;

import type { FC } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RobotoRegularText } from './StyledText';
import { TRDLBJsonTokenMetadata } from 'treadle-mockup-server';
import { MD3DarkTheme, ProgressBar } from 'react-native-paper';
import CustomImage from './Image';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CardProps {
  bikeMetadata: TRDLBJsonTokenMetadata;
}

const BikeCard: FC<CardProps> = ({ bikeMetadata }) => {
  const [error, setError] = useState(false);
  // const stats = JSON.parse(bikeMetadata.extra as string);
  // const durabilityPercentage = stats.durability / 200;
  // const warePercentage = 110 - stats.ware / 10;
  // const efficiencyPercentage = stats.efficiency / 10;
  // const comfortPercentage = 110 - stats.comfort / 10;

  const handleImageError = () => {
    setError(true);
  };

  return (
    <View className='bg-md3-surface flex-1'>
      <View className='p-4 justify-center'>
        <RobotoRegularText className='text-md3-on-bg text-center text-[32px] tracking-[0.5px]'>
          {bikeMetadata.title}
        </RobotoRegularText>
      </View>
      <View className='aspect-square justify-center items-center overflow-hidden rounded-[12px]'>
        {bikeMetadata.media && !error ? (
          <CustomImage onError={handleImageError} source={{ uri: bikeMetadata.media }} className='w-full h-full' />
        ) : (
          <MaterialCommunityIcons name='image-off-outline' size={120} color={MD3DarkTheme.colors.onSurface} />
        )}
      </View>
      {/*  <View className='justify-evenly'>*/}
      {/*    <RobotoRegularText className='text-[14px] text-md3-on-surface px-[2px] leading-[16px]'>*/}
      {/*      Durability: {stats.durability / 100} unit{stats.durability / 100 > 1 ? 's' : ''}*/}
      {/*    </RobotoRegularText>*/}
      {/*    <ProgressBar className='w-full my-3' progress={durabilityPercentage / 100} />*/}
      {/*    <RobotoRegularText className='text-[14px] text-md3-on-surface px-[2px] leading-[16px]'>*/}
      {/*      Ware: {stats.ware / 100} durability unit{stats.ware / 100 > 1 ? 's' : ''} per kilometre*/}
      {/*      travelled*/}
      {/*    </RobotoRegularText>*/}
      {/*    <ProgressBar className='w-full my-3' progress={warePercentage / 100} />*/}
      {/*    <RobotoRegularText className='text-[14px] text-md3-on-surface px-[2px] leading-[16px]'>*/}
      {/*      Efficiency: {stats.efficiency / 100} $SCRW per kilometre travelled*/}
      {/*    </RobotoRegularText>*/}
      {/*    <ProgressBar className='w-full my-3' progress={efficiencyPercentage / 100} />*/}
      {/*    <RobotoRegularText className='text-[14px] text-md3-on-surface px-[2px] leading-[16px]'>*/}
      {/*      Comfort: {stats.comfort / 100} energy unit{stats.comfort / 100 > 1 ? 's' : ''} spent per*/}
      {/*      kilometre travelled*/}
      {/*    </RobotoRegularText>*/}
      {/*    <ProgressBar className='w-full my-3' progress={comfortPercentage / 100} />*/}
      {/*  </View>*/}
    </View>
  );
};

export default BikeCard;

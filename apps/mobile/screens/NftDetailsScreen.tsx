import type { TRDLBTokenMetadataExtra } from 'treadle-mockup-server';
import { View } from 'react-native';
import { RobotoRegularText } from '../components/StyledText';
import { Appbar } from 'react-native-paper';
import { RootStackScreenProps } from '../types/navigation-types';
import FastImage from 'react-native-fast-image';
import { ProgressBar } from "react-native-paper"

interface ExtraDataIndex extends TRDLBTokenMetadataExtra {
  [key: string]: number;
}

const NftDetailsScreen = ({ navigation, route }: RootStackScreenProps<'NftDetails'>) => {
  const { nft: nftDetails } = route.params;
  const parsedNftExtraData: ExtraDataIndex = JSON.parse(nftDetails?.metadata.extra || '{}');

  const durabilityPercentage = parsedNftExtraData.durability / 200
  const warePercentage = 110 - parsedNftExtraData.ware / 10
  const efficiencyPercentage = parsedNftExtraData.efficiency / 10
  const comfortPercentage = 110 - parsedNftExtraData.comfort / 10

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-md3-surface px-4">
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title={nftDetails.metadata.title} />
      </Appbar.Header>
      {nftDetails?.metadata.media && (
        <FastImage
          className="w-full h-[200px] rounded-[12px] mb-4"
          source={{ uri: nftDetails.metadata.media }}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
      <RobotoRegularText className="text-md3-on-bg text-[22px] tracking-[0.5px]">
        {nftDetails?.metadata.title}
      </RobotoRegularText>
          <View className="mt-4">
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              Durability
            </RobotoRegularText>
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              {parsedNftExtraData.durability / 100} unit{parsedNftExtraData.durability / 100 > 1 ? 's' : ''}
            </RobotoRegularText>
            <ProgressBar className='w-full my-3' progress={durabilityPercentage / 100}/>
          </View>
          <View className="mt-4">
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              Ware
            </RobotoRegularText>
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              {parsedNftExtraData.ware / 100} durability unit{parsedNftExtraData.ware / 100 > 1 ? 's' : ''} per kilometre
            </RobotoRegularText>
            <ProgressBar className='w-full my-3' progress={warePercentage / 100}/>
          </View>
          <View className="mt-4">
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              Efficiency
            </RobotoRegularText>
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              {parsedNftExtraData.efficiency / 100} $SCRW per kilometre travelled
            </RobotoRegularText>
            <ProgressBar className='w-full my-3' progress={efficiencyPercentage / 100}/>
          </View>
          <View className="mt-4">
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              Comfort
            </RobotoRegularText>
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              {parsedNftExtraData.comfort / 100} energy unit{parsedNftExtraData.comfort / 100 > 1 ? 's' : ''} spent per
            kilometre travelled
            </RobotoRegularText>
            <ProgressBar className='w-full my-3' progress={comfortPercentage / 100}/>
          </View>
    </View>
  );
};

export default NftDetailsScreen;

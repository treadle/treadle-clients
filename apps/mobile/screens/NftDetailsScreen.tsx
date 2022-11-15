import type { TRDLBTokenMetadataExtra } from 'treadle-mockup-server';
import { View } from 'react-native';
import { RobotoRegularText } from '../components/StyledText';
import { Appbar } from 'react-native-paper';
import { RootStackScreenProps } from '../types/navigation-types';
import FastImage from 'react-native-fast-image';

interface ExtraDataIndex extends TRDLBTokenMetadataExtra {
  [key: string]: number;
}

const NftDetailsScreen = ({ navigation, route }: RootStackScreenProps<'NftDetails'>) => {
  const { nft: nftDetails } = route.params;
  const parsedNftExtraData: ExtraDataIndex = JSON.parse(nftDetails?.metadata.extra || '{}');

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
      {Object.keys(parsedNftExtraData).map((key) => {
        return (
          <View key={key} className="mt-4">
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              {key}
            </RobotoRegularText>
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              {parsedNftExtraData[key]}
            </RobotoRegularText>
          </View>
        );
      })}
    </View>
  );
};

export default NftDetailsScreen;

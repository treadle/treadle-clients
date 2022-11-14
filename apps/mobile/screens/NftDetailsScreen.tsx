import { Text, View, Image } from 'react-native';
import { useNftDetailsStore } from '../store/useNftDetailsStore';
import { RobotoRegularText } from '../components/StyledText';

const NftDetailsScreen = () => {
  const { nftDetails } = useNftDetailsStore();

  console.log(nftDetails);

  return (
    <View className="flex-1 bg-md3-surface px-4">
      <Image
        className="w-full h-[200px]"
        source={{ uri: nftDetails?.metadata.media }}
        resizeMode="contain"
      />
      <RobotoRegularText className="text-md3-on-bg text-[22px] tracking-[0.5px]">
        {nftDetails?.metadata.title}
      </RobotoRegularText>
    </View>
  );
};

export default NftDetailsScreen;

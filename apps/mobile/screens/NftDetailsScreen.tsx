import { Image } from 'react-native';
import { useNftDetailsStore } from '../store/useNftDetailsStore';
import { RobotoRegularText } from '../components/StyledText';
import { SafeAreaView } from 'react-native-safe-area-context';

const NftDetailsScreen = () => {
  const { nftDetails } = useNftDetailsStore();

  return (
    <SafeAreaView className='flex-1 bg-md3-surface px-4'>
      {nftDetails?.metadata.media && (
        <Image
          className='w-full h-[200px]'
          source={{ uri: nftDetails.metadata.media }}
          resizeMode='contain'
        />
      )}
      <RobotoRegularText className='text-md3-on-bg text-[22px] tracking-[0.5px]'>
        {nftDetails?.metadata.title}
      </RobotoRegularText>
    </SafeAreaView>
  );
};

export default NftDetailsScreen;

import { Text, View } from 'react-native';
import { useNftDetailsStore } from '../store/useNftDetailsStore';

const NftDetailsScreen = () => {
  const { nftDetails } = useNftDetailsStore();

  console.log(nftDetails);

  return (
    <View>
      <Text>123132</Text>
    </View>
  );
};

export default NftDetailsScreen;

import type { FC } from 'react';
import type { TRDLBJsonToken } from 'treadle-mockup-server';
import { Pressable, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { memo, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomImage from './Image';
import { MD3DarkTheme } from 'react-native-paper';

const errorUri = 'htt://via.placeholder.com/150';

interface CardProps {
  nft: TRDLBJsonToken;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const NftCard: FC<CardProps> = ({ nft, navigation }) => {
  const [error, setError] = useState(false);

  const NftCardHandler = (item: TRDLBJsonToken) => {
    navigation.navigate('NftDetails', { nft: item });
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <Pressable onPress={() => NftCardHandler(nft)}>
      <View className='m-4 border-2 items-center justify-center w-[140px] h-[140px] border-md3-outline-variant rounded-[12px] overflow-hidden'>
          {!error && nft.metadata.media ? (
            <CustomImage
              onError={handleImageError}
              className='w-full h-full'
              source={{ uri: nft.metadata.media }}
            />
          ) : (
            <MaterialCommunityIcons
              name='image-off-outline'
              size={80}
              color={MD3DarkTheme.colors.onSurface}
            />
          )}
      </View>
    </Pressable>
  );
};

export default memo(NftCard);
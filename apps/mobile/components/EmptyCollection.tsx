import type { FC } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MD3DarkTheme } from 'react-native-paper';
import { RobotoRegularText } from './StyledText';
import LinkButton from './LinkButton';

const EmptyCollection: FC = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <MaterialCommunityIcons
        name='cart-arrow-right'
        size={60}
        color={MD3DarkTheme.colors.onSurface}
      />
      <RobotoRegularText className='text-md3-on-surface text-center text-[28px] leading-[36px] my-4'>
        Oops, you don't have any bikes yet!
      </RobotoRegularText>
      <RobotoRegularText className='text-md3-on-surface text-center text-[16px] leading-[24px] tracking-[0.1px] mb-4'>
        Its time to get started, head over to the marketplace to get your first bike!
      </RobotoRegularText>
      <LinkButton to={{ screen: 'Home', params: { screen: 'Marketplace' } }}>
        <RobotoRegularText className='text-center text-[24px]'>
          Go to marketplace
        </RobotoRegularText>
      </LinkButton>
    </View>
  );
};

export default EmptyCollection;
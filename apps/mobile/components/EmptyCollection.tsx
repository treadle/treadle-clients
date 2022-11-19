import type { FC } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MD3DarkTheme } from 'react-native-paper';
import { RobotoMediumText, RobotoRegularText } from './StyledText';
import LinkButton from './LinkButton';

const EmptyCollection: FC = () => {
  return (
    <View className='flex-1 justify-center px-4 items-center'>
      <MaterialCommunityIcons
        name='cart-arrow-right'
        size={60}
        color={MD3DarkTheme.colors.onSurface}
      />
      <RobotoRegularText className='text-md3-on-surface text-center text-[22px] leading-[28px] my-4'>
        Oops, you don't have any bikes yet!
      </RobotoRegularText>
      <RobotoRegularText className='text-md3-on-surface text-center text-[14px] leading-[20px] tracking-[0.1px] mb-4'>
        Its time to get started, head over to the marketplace to get your first bike!
      </RobotoRegularText>
      <LinkButton to={{ screen: 'Home', params: { screen: 'Marketplace' } }}>
        <RobotoMediumText className='text-center text-[14px] leading-[20px] tracking-[0.1px]'>
          Go to marketplace
        </RobotoMediumText>
      </LinkButton>
    </View>
  );
};

export default EmptyCollection;
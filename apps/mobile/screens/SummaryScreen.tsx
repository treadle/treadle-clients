import type { RootStackScreenProps } from '../types/navigation-types';
import { View, Button } from 'react-native';
import { RobotoMediumText } from '../components/StyledText';
import { TouchableRipple } from 'react-native-paper';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function SummaryScreen({ navigation, route }: RootStackScreenProps<'Summary'>) {
  return (
    <View className='flex-1'>
      <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut />
      {/*<ConfettiCannon count={200} origin={{ x: 0, y: -10 }} fadeOut />*/}
      <View className='flex-1 justify-evenly items-center'>
        <RobotoMediumText className='text-md3-on-bg text-[17px]'>
          Distance you've travelled is{' '}
          {`${Math.floor(route.params.distance / 1000)}`.padStart(2, '0') +
            '.' +
            `${Math.floor(route.params.distance / 10) % 100}`.padStart(2, '0')}
        </RobotoMediumText>
        <RobotoMediumText className='text-md3-on-bg text-[17px]'>
          Time you've been riding for is{' '}
          {`${Math.floor(route.params.time / 60) % 60}`.padStart(2, '0') +
            ':' +
            `${route.params.time % 60}`.padStart(2, '0')}
        </RobotoMediumText>
        <RobotoMediumText className='text-md3-on-bg text-[17px]'>
          You've earned {route.params.earned} tokens
        </RobotoMediumText>
      </View>
      <View className='flex-1 justify-center items-center'>
        <View
          className='w-24 h-24 mx-auto mb-16 rounded-full overflow-hidden items-center justify-center bg-md3-primary'>
          <TouchableRipple
            borderless
            className='w-full h-full items-center justify-center'
            onPress={() => navigation.navigate('Home')}>
            <RobotoMediumText className='text-md3-on-primary text-[17px]'>Home</RobotoMediumText>
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
}

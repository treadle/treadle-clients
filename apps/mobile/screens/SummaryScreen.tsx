import type { RootStackScreenProps } from '../types/navigation-types';
import { View, Button } from 'react-native';
import { RobotoMediumText, RobotoBoldText, RobotoRegularText } from '../components/StyledText';
import { TouchableRipple } from 'react-native-paper';

import { MaterialIcons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function SummaryScreen({ navigation, route }: RootStackScreenProps<'Summary'>) {
  return (
    <View className="flex-1">
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut={true} />
      <View className="flex-1 justify-center items-center">
        <RobotoBoldText className="text-md3-on-bg text-[22px] tracking-[0.5px]">
          Congratulations!
        </RobotoBoldText>
      </View>
      <View className="flex-1 justify-center items-center">
        <View className="w-full flex-row justify-evenly">
          <View className="flex-col items-center justify-between h-14">
            <MaterialIcons name="timer" size={32} color="white" />
            <RobotoRegularText className="text-md3-on-bg text-[22px] tracking-[0.5px]">
              {`${Math.floor(route.params.time / 60) % 60}`.padStart(2, '0') +
                ':' +
                `${route.params.time % 60}`.padStart(2, '0')}
            </RobotoRegularText>
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              min
            </RobotoRegularText>
          </View>
          <View className="flex-col items-center justify-between h-14">
            <MaterialIcons name="monetization-on" size={32} color="white" />
            <RobotoRegularText className="text-md3-on-bg text-[22px] tracking-[0.5px]">
              {route.params.earned}
            </RobotoRegularText>
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              earned
            </RobotoRegularText>
          </View>
          <View className="flex-col items-center justify-between h-14">
            <MaterialIcons name="directions-bike" size={32} color="white" />
            <RobotoRegularText className="text-md3-on-bg text-[22px] tracking-[0.5px]">
              {`${Math.floor(route.params.distance / 1000)}`.padStart(2, '0') +
                '.' +
                `${Math.floor(route.params.distance / 10) % 100}`.padStart(2, '0')}
            </RobotoRegularText>
            <RobotoRegularText className="text-md3-on-bg text-[16px] tracking-[0.5px]">
              km
            </RobotoRegularText>
          </View>
        </View>
      </View>
      <View className="flex-1 justify-center items-center"></View>
      <View className="w-24 h-24 mx-auto mb-16 rounded-full overflow-hidden items-center justify-center bg-md3-primary">
        <TouchableRipple
          borderless
          className="w-full h-full items-center justify-center"
          onPress={() => navigation.navigate('Home')}>
          <RobotoMediumText className="text-md3-on-primary text-[17px]">End</RobotoMediumText>
        </TouchableRipple>
      </View>
    </View>
  );
}

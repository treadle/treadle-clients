import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { FC } from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import Colors from '../constants/Colors';
import { RobotoMediumText } from './StyledText';

const BottomNavigationBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View className='justify-center flex-row items-center bg-md3-surface py-[12px] gap-x-2'>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={route.key} className='items-center'>
            <View className='mb-1'>
              <TouchableRipple
                accessibilityRole='button'
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                borderless
                className={`py-[10px] px-[26px] rounded-[16px] overflow-hidden ${isFocused ? 'bg-md3-secondary-container' : ''}`}
              >
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    color: isFocused ? Colors.dark.tabIconSelected : Colors.dark.tabIconDefault,
                    size: 16,
                  })}
              </TouchableRipple>
            </View>
            <RobotoMediumText className='text-[12px] text-md3-on-bg'>
              {label}
            </RobotoMediumText>
          </View>
        );
      })}
    </View>
  );
};

export default BottomNavigationBar;

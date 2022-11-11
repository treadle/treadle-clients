import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { FC } from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';

const BottomNavigationBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View className='justify-center flex-row items-center bg-[#1C1B1F] py-[12px] gap-x-2'>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
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
          <View
            className='items-center'
          >
            <View className='mb-1'>
              <TouchableRipple
                accessibilityRole='button'
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                borderless
                className={`py-[10px] px-[26px] rounded-[16px] overflow-hidden ${isFocused ? 'bg-[#4A4458]' : ''}`}
              >
                {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: '#E8DEF8', size: 16 })}
              </TouchableRipple>
            </View>
            <Text className='font-medium text-[12px] text-[#E6E1E5]'>
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default BottomNavigationBar;
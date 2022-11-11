import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import type { FC } from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const NavigationBar: FC<BottomTabHeaderProps> = ({ route }) => {
  return (
    <Appbar.Header>
      <Appbar.Content title={route.name} />
      <View className='p-2 bg-red-700'>
        <Text>Energy</Text>
      </View>
      <View className='p-2 bg-green-500'>
        <Text>Money</Text>
      </View>
    </Appbar.Header>
  );
};

export default NavigationBar;

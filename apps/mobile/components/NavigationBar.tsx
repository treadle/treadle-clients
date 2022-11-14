import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Appbar, MD3DarkTheme } from 'react-native-paper';

import * as SecureStore from 'expo-secure-store';
import { useEnergyTokensStore } from '../store/useEnergyTokensStore';

const NavigationBar: FC<BottomTabHeaderProps> = ({ route }) => {
  const { energy, tokens, setEnergy, setTokens } = useEnergyTokensStore();

  return (
    <Appbar.Header theme={MD3DarkTheme}>
      <Appbar.Content theme={MD3DarkTheme} title={route.name} />
      <View className="p-2 bg-red-700">
        <Text>Energy: {energy}</Text>
      </View>
      <View className="p-2 bg-green-500">
        <Text>Tokens: {tokens}</Text>
      </View>
    </Appbar.Header>
  );
};

export default NavigationBar;

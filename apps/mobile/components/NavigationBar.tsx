import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import type { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Appbar, MD3DarkTheme } from 'react-native-paper';
import { useEnergyTokensStore } from '../store/useEnergyTokensStore';
import { RobotoRegularText } from './StyledText';
import { useAccountStore } from '../store/useAccountStore';

const NavigationBar: FC<BottomTabHeaderProps> = ({ route }) => {
  const { energy, setEnergy, tokens, setTokens } = useEnergyTokensStore();
  const { setAccount } = useAccountStore();

  return (
    <Appbar.Header theme={MD3DarkTheme}>
      <Appbar.Content theme={MD3DarkTheme} title={route.name} />
      <Pressable onPress={() => setEnergy(10)}>
        <View className='p-2 bg-yellow-500 mr-2 rounded-full'>
          <RobotoRegularText className='text-black'>$ENRG: {energy}</RobotoRegularText>
        </View>
      </Pressable>
      <Pressable onPress={() => setTokens(0)}>
        <View className='p-2 bg-green-500 mr-2 rounded-full'>
          <RobotoRegularText>$SCRW: {tokens}</RobotoRegularText>
        </View>
      </Pressable>
      <Appbar.Action icon='logout' onPress={() => setAccount(null)} />
    </Appbar.Header>
  );
};

export default NavigationBar;

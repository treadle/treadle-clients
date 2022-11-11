import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const NavigationBar: FC<BottomTabHeaderProps> = ({ route }) => {
  return (
    <Appbar.Header>
      <Appbar.Content title={route.name} />
      <View style={styles.energy}>
        <Text>Energy</Text>
      </View>
      <View style={styles.money}>
        <Text>Money</Text>
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  energy: {
    backgroundColor: 'yellow',
    padding: 10,
  },
  money: {
    backgroundColor: 'green',
    padding: 10,
  },
});

export default NavigationBar;

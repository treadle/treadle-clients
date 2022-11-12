import { View, Text, StyleSheet } from 'react-native';

const WalletScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Account Screen</Text>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
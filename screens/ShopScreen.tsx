import { View, Text, StyleSheet } from 'react-native';

const ShopScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Shop Screen</Text>
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
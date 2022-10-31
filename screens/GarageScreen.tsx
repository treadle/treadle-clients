import { View, Text, StyleSheet } from 'react-native';

const GarageScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Garage Screen</Text>
    </View>
  );
};

export default GarageScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
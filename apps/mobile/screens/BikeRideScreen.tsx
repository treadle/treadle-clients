import { View, Text, StyleSheet } from 'react-native';

const BikeRideScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Bike ride screen</Text>
    </View>
  );
};

export default BikeRideScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
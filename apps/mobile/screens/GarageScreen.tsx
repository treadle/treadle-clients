import { View, Text, StyleSheet } from 'react-native';
import { useAccountIdStore } from '../store/accountIdStore';
import { Button } from 'react-native-paper';

const GarageScreen = () => {
  const { accountId, setAccountId } = useAccountIdStore();

  return (
    <View style={styles.screen}>
      <Text>Hello {accountId}!</Text>
      <Button mode="outlined" onPress={() => setAccountId(null)}>
        Logout
      </Button>
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
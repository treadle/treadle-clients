import { View, StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useMockupServerStore } from '../store/mockupServerStore';
import { useAccountStore } from '../store/accountStore';
import { useCounterStore } from '../store/counterStore';

const ShopItem = () => {
  const { mockupServer } = useMockupServerStore();
  const { account } = useAccountStore();
  const { increment } = useCounterStore();

  const mintBike = async () => {
    if (mockupServer && account) {
      await mockupServer.mintBike(account.accountId);
      increment();
    }
  };

  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{
          // todo: replace with real image
          uri: 'https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE',
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Yeah Bitch</Text>
        <Text style={styles.description}>oaoaoaoa</Text>
        <View style={styles.actions}>
          <Button buttonColor='black' mode='contained' style={styles.button} onPress={mintBike}>
            Mint
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ShopItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
});
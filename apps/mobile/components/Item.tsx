import { View, StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';

const Item = () => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Item Title</Text>
        <Text style={styles.description}>Item Description</Text>
        <View style={styles.actions}>
          <Button buttonColor="black" mode="contained" style={styles.button} onPress={() => console.log('Mint')}>
            Mint
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
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
  }
});
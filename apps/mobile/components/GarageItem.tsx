import { View, StyleSheet, Text, Image } from 'react-native';
import { FC } from 'react';

const GarageItem: FC<{
  bike: any;
}> = ({bike}) => {

  console.log('bike', bike);

  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: bike.metadata.media,
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{bike?.metadata.title}</Text>
        <Text style={styles.description}>{bike?.metadata.description}</Text>
      </View>
    </View>
  );
};

export default GarageItem;

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
  }
});
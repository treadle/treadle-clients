import { View, StyleSheet } from 'react-native';
import Item from '../components/Item';
import EStyleSheet from 'react-native-extended-stylesheet';

const ShopScreen = () => {
  const items = 3;

  return (

    <View style={styles.screen}>
      <View style={styles.itemContainer}>
        {Array.from(Array(items).keys()).map((item, index) => (
          <View style={EStyleSheet.child(styles, 'itemRow', index, items)}>
            <Item />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ShopScreen;

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  itemContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  itemRow: {
    width: '33%',
    paddingRight: 10,
  },
  'itemRow:last-child': {
    paddingRight: 0,
  }
});
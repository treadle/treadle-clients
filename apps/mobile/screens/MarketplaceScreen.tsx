import { View } from 'react-native';
import ShopItem from '../components/ShopItem';
import EStyleSheet from 'react-native-extended-stylesheet';

const MarketplaceScreen = () => {

  return (

    <View style={styles.screen}>
      <View style={styles.itemContainer}>
        <ShopItem/>
      </View>
    </View>
  );
};

export default MarketplaceScreen;

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
import type { HomeTabScreenProps } from '../types/navigation-types';
import { useWindowDimensions } from 'react-native';
import { useCallback, useState } from 'react';
import { MD3DarkTheme } from 'react-native-paper';
import { RobotoRegularText } from '../components/StyledText';
import { SceneMap, TabBar, TabBarProps, TabView } from 'react-native-tab-view';
import Balances from '../components/Balances';
import NftCollection from '../components/NftCollection';

const renderScene = SceneMap({
  balances: Balances,
  collectibles: NftCollection,
});

const WalletScreen = ({ navigation }: HomeTabScreenProps<'Wallet'>) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'balances', title: 'Balances' },
    { key: 'collectibles', title: 'Collectibles' },
  ]);

  const renderTabBar = useCallback(
    (props: TabBarProps<any>) => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: MD3DarkTheme.colors.primary }}
        style={{ backgroundColor: MD3DarkTheme.colors.background }}
        renderLabel={({ route, focused, color }) => (
          <RobotoRegularText style={{ color, fontSize: 16 }}>{route.title}</RobotoRegularText>
        )}
      />
    ),
    []
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      sceneContainerStyle={{ paddingTop: 10 }}
    />
  );
};

export default WalletScreen;

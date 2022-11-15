import type { TRDLBJsonToken, TRDLBNftTokensForOwnerOptions } from 'treadle-mockup-server';
import type { HomeTabScreenProps, RootStackScreenProps } from '../types/navigation-types';
import { TRDLBContract } from 'treadle-mockup-server';
import { FlatList, Pressable, useWindowDimensions, View } from 'react-native';
import { useAccountStore } from '../store/useAccountStore';
import { useCallback, useEffect, useState } from 'react';
import { BN } from 'bn.js';
import { useCounterStore } from '../store/counterStore';
import { Button } from 'react-native-paper';
import { RobotoRegularText } from '../components/StyledText';
import FastImage from 'react-native-fast-image';
import { TabView, SceneMap, TabBar, TabBarProps } from 'react-native-tab-view';
import { useIsFocused } from '@react-navigation/native';
import Balances from '../components/Balances';
import NftCollection from '../components/NftCollection';

const renderScene = SceneMap({
  balances: Balances,
  collection: NftCollection,
});

function WalletScreen({ navigation }: HomeTabScreenProps<'Wallet'>) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'balances', title: 'Balances' },
    { key: 'collection', title: 'Collection' },
  ]);

  const renderTabBar = useCallback(
    (props: TabBarProps<any>) => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#1A1A1A' }}
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
    />
  );
}

export default WalletScreen;

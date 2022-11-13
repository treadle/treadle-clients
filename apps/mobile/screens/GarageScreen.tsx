import { View, StyleSheet, ScrollView } from 'react-native';
import { useAccountStore } from '../store/accountStore';
import { Button } from 'react-native-paper';
import { useMockupServerStore } from '../store/mockupServerStore';
import { useEffect, useState } from 'react';
import GarageItem from '../components/GarageItem';
import { useCounterStore } from '../store/counterStore';

const GarageScreen = () => {
  // const { account, setAccount } = useAccountStore();
  // const { mockupServer } = useMockupServerStore();
  // const [bikes, setBikes] = useState<any>([]);
  // const { counter } = useCounterStore();

  // const fetchBikes = async () => {
  //   if (mockupServer && account) {
  //     const response = await mockupServer.fetchBikesForOwner(account.accountId);
  //     setBikes(response);
  //   }
  // };
  //
  // useEffect(() => {
  //   fetchBikes();
  // }, [counter]);

  return (
    <View>
      {/*<ScrollView>*/}
      {/*  {bikes.map((bike: any) => (*/}
      {/*    <GarageItem key={bike.token_id} bike={bike} />*/}
      {/*  ))}*/}
      {/*</ScrollView>*/}
      {/*<Button mode='outlined' onPress={() => setAccount(null)}>*/}
      {/*  Logout*/}
      {/*</Button>*/}
    </View>
  );
};

export default GarageScreen;

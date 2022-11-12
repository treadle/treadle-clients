/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import type { HomeTabParamList, RootStackParamList, SignInTabParamList } from '../types';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as React from 'react';

import BottomNavigationBar from '../components/BottomNavigationBar';
import NavigationBar from '../components/NavigationBar';
import BikeRideScreen from '../screens/BikeRideScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
import WalletScreen from '../screens/WalletScreen';
import { useAccountStore } from '../store/accountStore';
import LinkingConfiguration from './LinkingConfiguration';
import TabBarIcon from '../components/TabBarIcon';

const Stack = createNativeStackNavigator<RootStackParamList>();
const SignInStack = createNativeStackNavigator<SignInTabParamList>();

export default function Navigation() {
  const { account } = useAccountStore();

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!!account
          ? <Stack.Screen name='Home' component={BottomTabNavigator} />
          : <Stack.Screen name='Login' component={SignInNavigator} />
        }
        <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SignInNavigator() {
  return (
    <SignInStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SignInStack.Screen name='SignIn' component={SignInScreen} />
    </SignInStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<HomeTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        header: (props) => <NavigationBar {...props} />,
      }}
      tabBar={(props) => <BottomNavigationBar {...props} />}>
      {/*<BottomTab.Screen*/}
      {/*  name='Garage'*/}
      {/*  component={GarageScreen}*/}
      {/*  options={{*/}
      {/*    title: 'Garage',*/}
      {/*    tabBarIcon: ({ color }) => <TabBarIcon name='link' color={color} />,*/}
      {/*  }}*/}
      {/*/>*/}
      <BottomTab.Screen
        name='Wallet'
        component={WalletScreen}
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <TabBarIcon name='wallet' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Ride'
        component={BikeRideScreen}
        options={{
          title: 'Bike Ride',
          tabBarIcon: ({ color }) => <TabBarIcon name='bike' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Marketplace'
        component={MarketplaceScreen}
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color }) => <TabBarIcon name='shopping' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

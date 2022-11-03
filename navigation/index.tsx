/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, HomeTabParamList, SignInTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ShopScreen from '../screens/ShopScreen';
import GarageScreen from '../screens/GarageScreen';
import BikeRideScreen from '../screens/BikeRideScreen';
import SignInScreen from '../screens/SignInScreen';
import { useAccountIdStore } from '../store/accountIdStore';
import AccountScreen from '../screens/AccountScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const SignInStack = createNativeStackNavigator<SignInTabParamList>();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { accountId } = useAccountIdStore();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {!!accountId
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
    <SignInStack.Navigator>
      <SignInStack.Screen
        name='SignIn'
        component={SignInScreen}
      />
    </SignInStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<HomeTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name='Garage'
        component={GarageScreen}
        options={{
          title: 'Garage',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Ride'
        component={BikeRideScreen}
        options={{
          title: 'Bike Ride',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Shop'
        component={ShopScreen}
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => <TabBarIcon name='shopping-cart' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

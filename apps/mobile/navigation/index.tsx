/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import type {
  HomeTabParamList,
  RootStackParamList,
  SignInTabParamList,
} from '../types/navigation-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomNavigationBar from '../components/BottomNavigationBar';
import NavigationBar from '../components/NavigationBar';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
import WalletScreen from '../screens/WalletScreen';
import BikeRideScreen from '../screens/BikeRideScreen';
import LinkingConfiguration from './LinkingConfiguration';
import TabBarIcon from '../components/TabBarIcon';
import GarageScreen from '../screens/GarageScreen';
import NftDetailsScreen from '../screens/NftDetailsScreen';
import SummaryScreen from '../screens/SummaryScreen';
import { useAccountStore } from '../store/useAccountStore';
import { adaptNavigationTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator<RootStackParamList>();
const SignInStack = createNativeStackNavigator<SignInTabParamList>();

const { DarkTheme } = adaptNavigationTheme({ dark: NavigationDarkTheme });

export default function Navigation() {
  const { account } = useAccountStore();

  return (
    <NavigationContainer theme={DarkTheme} linking={LinkingConfiguration}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!!account ? (
          <Stack.Screen name="Home" component={BottomTabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={SignInNavigator} />
        )}
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="BikeRide" component={BikeRideScreen} />
          <Stack.Screen name="Summary" component={SummaryScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="NftDetails" component={NftDetailsScreen} />
        </Stack.Group>
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
      <SignInStack.Screen name="SignIn" component={SignInScreen} />
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
      <BottomTab.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Garage"
        component={GarageScreen}
        options={{
          title: 'Garage',
          tabBarIcon: ({ color }) => <TabBarIcon name="garage" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <TabBarIcon name="wallet" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

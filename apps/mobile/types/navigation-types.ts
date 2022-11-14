/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList> | undefined;
  Login: NavigatorScreenParams<SignInTabParamList> | undefined;
  BikeRide: undefined;
  NotFound: undefined;
  NftDetails: undefined;
};

export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> = NativeStackScreenProps<
  HomeTabParamList,
  Screen
>;

export type SignInTabScreenProps<Screen extends keyof SignInTabParamList> = NativeStackScreenProps<
  SignInTabParamList,
  Screen
>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type SignInTabParamList = {
  SignIn: undefined;
};

export type HomeTabParamList = {
  Garage: undefined;
  Marketplace: undefined;
  Ride: undefined;
  Wallet: undefined;
};

export type RootTabScreenProps<Screen extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

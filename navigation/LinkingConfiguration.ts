/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const config = {
  screens: {
    Home: {
      screens: {
        Garage: 'garage',
        Account: 'account',
        Ride: 'ride',
        Shop: 'shop',
      }
    },
    Login: {
      screens: {
        SignIn: 'sign-in',
      }
    },
    NotFound: '*',
  }
}

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config,
};

export default linking;

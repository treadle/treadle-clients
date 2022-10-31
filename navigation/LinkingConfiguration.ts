/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Shop: {
            screens: {
              ShopScreen: 'shop',
            },
          },
          Garage: {
            screens: {
              GarageScreen: 'garage',
            }
          },
          Account: {
            screens: {
              AccountScreen: 'account',
            }
          },
          BikeRide: {
            screens: {
              BikeRideScreen: 'ride',
            }
          }
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;

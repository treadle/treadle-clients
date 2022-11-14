import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import 'expo-dev-client';

import { useCallback, useEffect } from 'react';
import { useAccountStore } from './store/useAccountStore';
import { useHydration } from './hooks/useStoreHydration';
import { setupMockupServer } from 'treadle-mockup-server';
import { connect, keyStores, utils } from 'near-api-js';

window.Buffer = window.Buffer || require('buffer').Buffer;

export default function App() {
  const isLoadingComplete = useCachedResources();
  const { account, setAccount, privateKey, setMasterAccount } = useAccountStore();
  const hydrated = useHydration();

  const [fontsLoaded] = useFonts({
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  const createFunctionalAccount = useCallback(async () => {
    if (account && privateKey) {
      const keyStore = new keyStores.InMemoryKeyStore();
      const keyPair = new utils.KeyPairEd25519(privateKey);

      await keyStore.setKey('testnet', account.accountId, keyPair);

      const connectionConfig = {
        networkId: 'testnet',
        keyStore,
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
      };

      const nearConnection = await connect(connectionConfig);
      const nearAccount = await nearConnection.account(account.accountId);

      const pantemonPrivateKey =
        'jNpUvccrCML6r4SRYkrVXfyiRDf61pyXh4UP6jwaEjYhVJbM6kWXZn86mt3w6hB4uhr3Xrhw2wmseUVA6Jetd9E';
      const { account: masterAccount } = await setupMockupServer(pantemonPrivateKey);

      console.log(
        'createFunctionalAccount',
        nearAccount.viewFunctionV2,
        masterAccount.viewFunctionV2
      );

      setMasterAccount(masterAccount);
      setAccount(nearAccount);
    }
  }, [privateKey]);

  const prepare = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    prepare();
  }, []);

  useEffect(() => {
    if (hydrated) {
      createFunctionalAccount();
    }
  }, [privateKey, hydrated]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!isLoadingComplete && !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <PaperProvider theme={MD3DarkTheme}>
        <Navigation />
        <StatusBar style='light' />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

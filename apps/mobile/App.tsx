import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import 'expo-dev-client';

import { setupMockupServer } from 'treadle-mockup-server';
import { useMockupServerStore } from './store/mockupServerStore';
import { useCallback, useEffect } from 'react';

EStyleSheet.build({});

window.Buffer = window.Buffer || require('buffer').Buffer;

export default function App() {
  const isLoadingComplete = useCachedResources();
  const { setMockupServer } = useMockupServerStore();

  const [fontsLoaded] = useFonts({
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  const createMockupServer = useCallback(async () => {
    const mockupServer = await setupMockupServer();
    setMockupServer(mockupServer);
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        createMockupServer();
      }
    }

    prepare();
  }, []);

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
      <PaperProvider>
        <Navigation />
        <StatusBar style='auto' />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

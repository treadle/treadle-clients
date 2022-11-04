import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import 'expo-dev-client';

import { setupMockupServer } from 'treadle-mockup-server';
import { useMockupServerStore } from './store/mockupServerStore';
import { useCallback, useEffect } from 'react';

EStyleSheet.build({

});

window.Buffer = window.Buffer || require("buffer").Buffer;

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const {setMockupServer} = useMockupServerStore();

  const createMockupServer = useCallback(async () => {
    const mockupServer = await setupMockupServer();
    setMockupServer(mockupServer);
  }, []);

  useEffect(() => {
    createMockupServer();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}

import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as nearAPI from 'near-api-js';
import { SignInTabScreenProps } from '../types';
import { NearAccount } from '../types/nearAccount';
import { useAccountIdStore } from '../store/accountIdStore';

export default function SignInScreen({}: SignInTabScreenProps<'SignIn'>) {
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);
  const {setAccountId} = useAccountIdStore();

  const fetchAccountIdFromPublicKey = async (publicKey: string) => {
    const INDEXER_SERVICE_URL = 'https://testnet-api.kitwallet.app';

    const CUSTOM_REQUEST_HEADERS = {
      'X-requestor': 'near',
    };

    const response = await fetch(`${INDEXER_SERVICE_URL}/publicKey/${publicKey}/accounts`, {
      headers: CUSTOM_REQUEST_HEADERS,
    });

    return response.json();
  };

  const handleSignIn = async () => {
    setLoading(true);
    const keyStore = await new nearAPI.keyStores.InMemoryKeyStore();
    const keyPair = await new nearAPI.utils.KeyPairEd25519(privateKey.replace('ed25519:', ''));

    const accountIds = await fetchAccountIdFromPublicKey(keyPair.publicKey.toString());
    const accountId = accountIds.find((id: string) => id.includes('testnet'));

    await keyStore.setKey('testnet', accountId, keyPair);

    const connectionConfig = {
      networkId: 'testnet',
      keyStore: keyStore, // first create a key store
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    };

    const nearConnection = await nearAPI.connect(connectionConfig);

    const nearAccount: NearAccount = await nearConnection.account(accountId);
    setAccountId(accountId);
    setLoading(false);
  };

  const privateKeyValidation = (value: string) => {
    return value && value.startsWith('ed25519:');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Treadle</Text>
      <Text style={styles.title}>Enter the private key associated with the account.</Text>
      <TextInput
        style={styles.input}
        mode='outlined'
        label='Private Key'
        placeholder='Private key'
        value={privateKey}
        onChangeText={setPrivateKey}
      />
      {/*{!privateKeyValidation(privateKey) && <Text style={styles.error}>Invalid private key</Text>}*/}
      <Button mode='outlined' onPress={handleSignIn} disabled={!privateKeyValidation(privateKey)} loading={loading}>
        Sign in
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  error: {
    color: 'red',
  },
});
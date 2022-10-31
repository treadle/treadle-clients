import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as nearAPI from 'near-api-js';

const SignInScreen = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAccountIdFromPublicKey = async (publicKey: string) => {
    const INDEXER_SERVICE_URL = 'https://testnet-api.kitwallet.app';

    const CUSTOM_REQUEST_HEADERS = {
      'X-requestor': 'near',
    };

    const response = await fetch(`${INDEXER_SERVICE_URL}/publicKey/${publicKey}/accounts`, {
      headers: CUSTOM_REQUEST_HEADERS,
    });

    return response.json();
  }

  const handleSignIn = async () => {
    const keyStore = await new nearAPI.keyStores.InMemoryKeyStore();
    const keyPair = await new nearAPI.utils.KeyPairEd25519(privateKey.replace('ed25519:', ''));

    const accountIds = await fetchAccountIdFromPublicKey(keyPair.publicKey.toString());
    const accountId = accountIds.find((id: string) => id.includes('testnet'));

    await keyStore.setKey('testnet', accountId, keyPair);

    const connectionConfig = {
      networkId: "testnet",
      keyStore: keyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };

    const nearConnection = await nearAPI.connect(connectionConfig);

    const nearAccount = await nearConnection.account(accountId);
    console.log(await nearAccount.getAccountBalance());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the private key associated with the account.</Text>
      <TextInput
        style={styles.input}
        placeholder='Private key'
        value={privateKey}
        onChangeText={setPrivateKey}
      />
      <Button title='Sign In' onPress={handleSignIn} disabled={loading} />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
  },
});
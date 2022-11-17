import type { Account } from 'near-api-js';
import { useCallback, useState } from 'react';
import { Alert, Linking, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAccountStore } from '../store/useAccountStore';
import { setupMockupServer } from 'treadle-mockup-server';
import { connect, keyStores, utils } from 'near-api-js';
import { RobotoBoldText, RobotoRegularText } from '../components/StyledText';

export default function SignInScreen() {
  const [localPrivateKey, setLocalPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAccount, setPrivateKey, setMasterAccount } = useAccountStore();

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

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    const keyStore = await new keyStores.InMemoryKeyStore();
    const keyPair = await new utils.KeyPairEd25519(localPrivateKey.replace('ed25519:', ''));

    const accountIds = await fetchAccountIdFromPublicKey(keyPair.publicKey.toString());
    const accountId = accountIds.find((id: string) => id.includes('testnet'));

    await keyStore.setKey('testnet', accountId, keyPair);

    const connectionConfig = {
      networkId: 'testnet',
      keyStore,
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    };

    const nearConnection = await connect(connectionConfig);

    const nearAccount: Account = await nearConnection.account(accountId);

    const pantemonPrivateKey =
      'jNpUvccrCML6r4SRYkrVXfyiRDf61pyXh4UP6jwaEjYhVJbM6kWXZn86mt3w6hB4uhr3Xrhw2wmseUVA6Jetd9E';
    const { account } = await setupMockupServer(pantemonPrivateKey);

    setMasterAccount(account);

    setPrivateKey(localPrivateKey.replace('ed25519:', ''));
    setAccount(nearAccount);
    setLoading(false);
  }, [localPrivateKey]);

  const privateKeyValidation = (value: string) => {
    return value && value.startsWith('ed25519:');
  };

  const handleOpenWalletUrl = () => {
    Linking.canOpenURL('https://wallet.testnet.near.org/create').then((supported) => {
      if (supported) {
        Linking.openURL('https://wallet.testnet.near.org/create');
      } else {
        Alert.alert('Unable to open URL', 'https://wallet.testnet.near.org/create');
      }
    });
  };

  return (
    <View className='flex-1 bg-md3-surface justify-center px-4'>
      <RobotoBoldText className='text-md3-on-bg text-[60px] leading-[64px] text-center mb-4'>
        Welcome!
      </RobotoBoldText>
      <RobotoRegularText className='text-[22px] text-md3-on-bg text-center leading-[28px] mb-4'>
        Enter the private key associated with the account.
      </RobotoRegularText>
      <TextInput
        className='mb-4'
        mode='outlined'
        label='Private Key'
        placeholder='Private key'
        value={localPrivateKey}
        onChangeText={setLocalPrivateKey}
      />
      <Button
        mode='outlined'
        onPress={handleSignIn}
        disabled={!privateKeyValidation(localPrivateKey) || loading}
        loading={loading}>
        Import Wallet
      </Button>

      <View className='mt-8'>
        <RobotoRegularText className='text-[22px] text-md3-on-bg'>
          If you don't have a near wallet, you can create one {''}
          {/* <- need for space */}
          <RobotoRegularText onPress={handleOpenWalletUrl} className='text-[22px] text-md3-primary underline'>
            here
          </RobotoRegularText>
        </RobotoRegularText>
        <RobotoRegularText className='text-[22px] text-md3-on-bg mt-4'>
          You can get your private key by clicking <RobotoRegularText className='underline'>export local private key</RobotoRegularText> button in Account page in the NEAR Wallet
        </RobotoRegularText>
      </View>
    </View>
  );
}

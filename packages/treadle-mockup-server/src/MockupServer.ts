import * as nearAPI from "near-api-js";
import BN from "bn.js";

import config from "./config";

export class MockupServer {
  near: nearAPI.Near;
  masterAccount: nearAPI.Account;

  // NFT contracts
  // bikesContract: nearAPI.Contract;
  // componentsContract: nearAPI.Contract;

  // FT contracts
  // scrwContract: nearAPI.Contract;
  // trdlContract: nearAPI.Contract;

  constructor(near: nearAPI.Near, masterAccount: nearAPI.Account) {
    this.near = near;
    this.masterAccount = masterAccount;
  }

  // fetchBikesMetadata() {

  // }

  // async fetchBikesForOwner(accountId: string) {
  //   const masterAccount = this.masterAccount;

  //   return await masterAccount.viewFunctionV2({ 
  //     contractId: CONTRACT_NAME, 
  //     methodName: "nft_tokens_for_owner", 
  //     args: { 
  //       "account_id": accountId 
  //     } 
  //   });
  // }

  // async mintBike(receiverId: string) {
  //   const masterAccount = this.masterAccount;

  //   return await masterAccount.functionCall({
  //     contractId: CONTRACT_NAME, 
  //     methodName: "nft_mint",
  //     args: {
  //       "token_id": (Date.now() + Math.floor(Math.random() * 1e6)).toString(),
  //       "receiver_id": receiverId, 
  //       "token_metadata": { 
  //         "title": "Yeah Bitch", 
  //         "description": "oaoaoaoa", 
  //         "media": "https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE", 
  //         "copies": 1
  //       }
  //     },
  //     attachedDeposit: new BN("1000000000000000000000000")
  //   });
  // }
}

// Initialize contract & set global variables
export async function setupMockupServer(privateKey: string) {
  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  
  const keyPair = nearAPI.KeyPair.fromString(privateKey);
  await keyStore.setKey('testnet', config.ACCOUNT_ID, keyPair);

  const connectionConfig: nearAPI.ConnectConfig = {
    networkId: "testnet",
    keyStore: keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
  };
  
  // Initialize connection to the NEAR testnet
  const near = await nearAPI.connect(connectionConfig);
  const account = await near.account(config.ACCOUNT_ID);

  const server = new MockupServer(near, account);

  return {
    server: server,
    near: near,
    account: account,
  };
}

import * as nearAPI from "near-api-js";
import BN from "bn.js";

import { CONTRACT_NAME } from "./config";
import { ConnectConfig } from "near-api-js";

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

  async fetchBikesForOwner(accountId: string) {
    const masterAccount = this.masterAccount;

    return await masterAccount.viewFunction(
      CONTRACT_NAME, 
      "nft_tokens_for_owner", 
      {
        "account_id": accountId,
      }
    );
  }

  async mintBike(receiverId: string) {
    const masterAccount = this.masterAccount;

    return await masterAccount.functionCall({
      contractId: CONTRACT_NAME, 
      methodName: "nft_mint",
      args: {
        "token_id": (Date.now() + Math.floor(Math.random() * 1e6)).toString(),
        "receiver_id": receiverId, 
        "token_metadata": { 
          "title": "Yeah Bitch", 
          "description": "oaoaoaoa", 
          "media": "https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE", 
          "copies": 1
        }
      },
      attachedDeposit: new BN("1000000000000000000000000")
    });
  }
}

// Initialize contract & set global variables
export async function setupMockupServer() {
  const MASTER_PRIVATE_KEY = 'jNpUvccrCML6r4SRYkrVXfyiRDf61pyXh4UP6jwaEjYhVJbM6kWXZn86mt3w6hB4uhr3Xrhw2wmseUVA6Jetd9E';

  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  
  const keyPair = nearAPI.KeyPair.fromString(MASTER_PRIVATE_KEY);
  await keyStore.setKey('testnet', 'pantemon.testnet', keyPair);

  const connectionConfig: ConnectConfig = {
    networkId: "testnet",
    keyStore: keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
  };
  
  // Initialize connection to the NEAR testnet
  const near = await nearAPI.connect(connectionConfig);

  const account = await near.account("pantemon.testnet");

  // account.viewFunction()

  // // Initializing our contract APIs by contract name and configuration
  
  // const contract = new nearAPI.Contract(
  //   account,
  //   config.contractName,
  //   {
  //     // View methods are read only. They don't modify the state, but usually return some value.
  //     viewMethods: ["nft_tokens_for_owner"],
  //     // Change methods can modify the state. But you don't receive the returned value when called.
  //     changeMethods: ["nft_mint"],
  //   }
  // );

  // contract.account.viewFunction()

  return new MockupServer(near, account);
}

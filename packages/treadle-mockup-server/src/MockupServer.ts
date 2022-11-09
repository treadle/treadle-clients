import * as nearAPI from "near-api-js";
import BN from "bn.js";

import { CONTRACT_NAME } from "./config";
import { ConnectConfig } from "near-api-js";

const ONE_TENTH_OF_A_NEAR = () => {
  return new BN("100000000000000000000000");
}

// interface TRDLBBikeStats {
//   durability: number;
//   wear: number;
//   efficiency: number;
//   comfort: number;
// }

export interface TRDLBTokenMetadata {
  title: string;
  description: string;
  media: string;
  extra: string;
}

export class TRDLBContract {
  account: nearAPI.Account;
  contractId: string;
  
  constructor(account: nearAPI.Account, contractId: string) {
    this.account = account;
    this.contractId = contractId;
  }

  async nft_mint(receiverId: string, metadata: TRDLBTokenMetadata) {
    const account = this.account;
    const contractId = this.contractId;

    const tokenId = `${Date.now() + Math.floor(Math.random() * 1e8)}`;

    return await account.functionCall({
      contractId: contractId, 
      methodName: "nft_mint",
      args: {
        "token_id": tokenId,
        "receiver_id": receiverId, 
        "token_metadata": metadata,
      },
      attachedDeposit: ONE_TENTH_OF_A_NEAR(), // 0.1 NEAR
    });
  }

  async nft_burn(tokenId: string) {
    throw new Error("NOT IMPLEMENTED");
  }

  async nft_metadata_edit(tokenId: string, metadata: TRDLBTokenMetadata) {
    throw new Error("NOT IMPLEMENTED");
  }

  // To-Do:
  // from_index: Option<U128>
  // limit: Option<u64>
  async nft_tokens_for_owner(accountId: string) {
    throw new Error("NOT IMPLEMENTED");
  }
}


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

    return await masterAccount.viewFunctionV2({ 
      contractId: CONTRACT_NAME, 
      methodName: "nft_tokens_for_owner", 
      args: { 
        "account_id": accountId 
      } 
    });
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
export async function setupMockupServer(privateKey: string) {
  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  
  const keyPair = nearAPI.KeyPair.fromString(privateKey);
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

  const server = new MockupServer(near, account);

  return {
    server: server,
    near: near,
    account: account,
  };
}

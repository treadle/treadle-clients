import * as nearAPI from 'near-api-js';
import * as utils from './utils';

// // interface TRDLBBikeStats {
// //   durability: number;
// //   wear: number;
// //   efficiency: number;
// //   comfort: number;
// // }

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
        "metadata": metadata,
        "receiver_id": receiverId, 
      },
      attachedDeposit: utils.ONE_TENTH_OF_A_NEAR(), // 0.1 NEAR
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
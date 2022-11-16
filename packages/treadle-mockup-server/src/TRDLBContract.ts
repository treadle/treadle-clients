import BN from 'bn.js';
import * as nearAPI from 'near-api-js';
import * as utils from './utils';

export interface TRDLBTokenMetadataExtra {
  durability: number; // measured in (units),
  ware: number; // measured in (units * energy ^ -1), accuracy is (up to 2 decimal places)
  efficiency: number; // measured in (tokens * energy ^ -1), accuracy is (up to 2 decimal places)
  comfort: number; // measured in (energy * kilometre ^ -1), accuracy is (up to 2 decimal places)
}

export interface TRDLBJsonTokenMetadata {
  title: string | null;
  description: string | null;
  media: string | null;
  media_hash?: string | null;
  copies?: number | null;
  issued_at?: number | null;
  expires_at?: number | null;
  starts_at?: number | null;
  updated_at?: number | null;
  extra: string | null;
  reference?: string | null;
  reference_hash?: string | null;
}

export interface TRDLBJsonToken {
  token_id: string;
  owner_id: string;
  metadata: TRDLBJsonTokenMetadata,
  approved_account_ids: object,
  royalty: object,
}

export class TRDLBContract {
  account: nearAPI.Account;
  contractId: string;
  
  constructor(account: nearAPI.Account, contractId: string) {
    this.account = account;
    this.contractId = contractId;
  }

  async nft_mint(options: TRDLBNftMintOptions) {
    const account = this.account;
    const contractId = this.contractId;

    const token_id = (options.token_id) ? options.token_id : `${Date.now() + Math.floor(Math.random() * 1e8)}`;

    return await account.functionCall({
      contractId: contractId, 
      methodName: "nft_mint",
      args: {
        "token_id": token_id,
        "metadata": options.metadata,
        "receiver_id": options.receiver_id, 
      },
      attachedDeposit: utils.ONE_TENTH_OF_A_NEAR(), // 0.1 NEAR
    });
  }

  async nft_token_metadata_edit(options: TRDLBNftTokenMetadataEditOptions) {
    const account = this.account;
    const contractId = this.contractId;

    return await account.functionCall({
      contractId: contractId, 
      methodName: "nft_token_metadata_edit",
      args: {
        "token_id": options.token_id,
        "metadata": options.metadata,
      },
      attachedDeposit: utils.ONE_TENTH_OF_A_NEAR(), // 0.1 NEAR
    });
  }

  // To-Do:
  // from_index: Option<U128>
  // limit: Option<u64>
  async nft_tokens_for_owner(options: TRDLBNftTokensForOwnerOptions) {
    const account = this.account;
    const contractId = this.contractId;

    return await account.viewFunctionV2({ 
      contractId: contractId, 
      methodName: "nft_tokens_for_owner", 
      args: options, 
    });
  }

  async nft_token(options: TRDLBNftTokenOptions) {
    const account = this.account;
    const contractId = this.contractId;

    return await account.viewFunctionV2({ 
      contractId: contractId, 
      methodName: "nft_token", 
      args: {
        "token_id": options.token_id,
      }, 
    });
  }
}

export interface TRDLBNftMintOptions {
  token_id?: string;
  metadata: TRDLBJsonTokenMetadata,
  receiver_id: string,
}

export interface TRDLBNftTokensForOwnerOptions {
  account_id: string,
  from_index?: BN,
  limit?: number,
}

export interface TRDLBNftTokenOptions {
  token_id: string,
}

export interface TRDLBNftTokenMetadataEditOptions {
  token_id: string,
  metadata: TRDLBJsonTokenMetadata,
}
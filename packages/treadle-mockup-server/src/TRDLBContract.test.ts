import { expect, test } from "@jest/globals";
import { BN } from "bn.js";

import { setupMockupServer } from "./MockupServer";

import { 
    TRDLBContract, 
    TRDLBJsonTokenMetadata, 
    TRDLBTokenMetadataExtra, 
    TRDLBNftTokensForOwnerOptions, 
    TRDLBNftMintOptions, 
    TRDLBJsonToken,
    TRDLBNftTokenOptions,
    TRDLBNftTokenMetadataEditOptions
} from "./TRDLBContract";

import config from "./config";


const RANDOM_TOKEN_ID = `${Date.now() + Math.floor(Math.random() * 1e8)}`;

test('should mint a new NFT with given metadata', async () => {
    const { account } = await setupMockupServer(config.PRIVATE_KEY);

    const contract = new TRDLBContract(account, config.CONTRACT_ID);
    
    const extra: TRDLBTokenMetadataExtra = {
        durability: 10000, // 100.00 units
        ware: 100, // 1.00 unit burnt per kilometre travelled
        efficiency: 500, // 5.00 tokens earned per energy consumed
        comfort: 200, // 2.00 energy consumed per kilometre travelled
    }

    const metadata: TRDLBJsonTokenMetadata = {
        title: "City Bike",
        description: "A simple bike for travelling across your hometown",
        media: "https://www.hubspot.com/hubfs/Smiling%20Leo%20Perfect%20GIF.gif",
        extra: JSON.stringify(extra),
    }; 

    const options: TRDLBNftMintOptions = {
        token_id: RANDOM_TOKEN_ID,
        receiver_id: "pantemon.testnet",
        metadata: metadata,
    };

    const response = await contract.nft_mint(options);

    expect(response).toBeDefined();
});

test('should return a list of NFTs on given account', async () => {
    const { account } = await setupMockupServer(config.PRIVATE_KEY);

    const contract = new TRDLBContract(account, config.CONTRACT_ID);
    
    const options: TRDLBNftTokensForOwnerOptions = {
        account_id: "pantemon.testnet",
        from_index: new BN(0),
        limit: 5,
    };

    const response: TRDLBJsonToken[]  = await contract.nft_tokens_for_owner(options);    

    expect(response.length >= 1 && response.length <= 5).toBeTruthy();
});

test('should return the token minted in the first test', async () => {
    const { account } = await setupMockupServer(config.PRIVATE_KEY);

    const contract = new TRDLBContract(account, config.CONTRACT_ID);
    
    const options: TRDLBNftTokenOptions = {
        token_id: RANDOM_TOKEN_ID
    };


    const response: TRDLBJsonToken = await contract.nft_token(options);    

    expect(response).toEqual(
        expect.objectContaining({
            token_id: RANDOM_TOKEN_ID,
            owner_id: "pantemon.testnet",
            metadata: expect.objectContaining({
                title: "City Bike",
                description: "A simple bike for travelling across your hometown",
                media: "https://www.hubspot.com/hubfs/Smiling%20Leo%20Perfect%20GIF.gif",
                media_hash: null,
                copies: null,
                issued_at: null,
                expires_at: null,
                starts_at: null,
                updated_at: null,
                extra: "{\"durability\":10000,\"ware\":100,\"efficiency\":500,\"comfort\":200}",
                reference: null,
                reference_hash: null,
            }),
            approved_account_ids: {},
            royalty: {},
        })
    );
});

test('should edit given NFT\'s token metadata', async () => {
    const { account } = await setupMockupServer(config.PRIVATE_KEY);

    const contract = new TRDLBContract(account, config.CONTRACT_ID);
    
    const extra: TRDLBTokenMetadataExtra = {
        durability: 5000, // 50.00 units
        ware: 200, // 2.00 unit burnt per kilometre travelled
        efficiency: 200, // 2.00 tokens earned per energy consumed
        comfort: 100, // 1.00 energy consumed per kilometre travelled
    }

    const metadata: TRDLBJsonTokenMetadata = {
        title: "Sexy Bike",
        description: "The sexiest bike in the whole world!",
        media: "https://media.giphy.com/media/pI2paNxecnUNW/giphy.gif",
        extra: JSON.stringify(extra),
    }; 

    const nftTokenMetadataEditOptions: TRDLBNftTokenMetadataEditOptions = {
        token_id: RANDOM_TOKEN_ID,
        metadata: metadata,
    };

    await contract.nft_token_metadata_edit(nftTokenMetadataEditOptions);
    

    const nftTokenOptions: TRDLBNftTokenOptions = {
        token_id: RANDOM_TOKEN_ID
    };


    const response: TRDLBJsonToken = await contract.nft_token(nftTokenOptions);    

    expect(response).toEqual(
        expect.objectContaining({
            token_id: RANDOM_TOKEN_ID,
            owner_id: "pantemon.testnet",
            metadata: expect.objectContaining({
                title: "Sexy Bike",
                description: "The sexiest bike in the whole world!",
                media: "https://i.seadn.io/gae/_srVI-l12c77xK10awKamnDZkjenyvKakh0FxbRx67PY4KNU69kfknyAAEmzvlhXdXsNBsSyCopa5u95VRjaOXX67oWm5sbXGcZVvw?auto=format&w=1000",
                media_hash: null,
                copies: null,
                issued_at: null,
                expires_at: null,
                starts_at: null,
                updated_at: null,
                extra: "{\"durability\":5000,\"ware\":200,\"efficiency\":200,\"comfort\":100}",
                reference: null,
                reference_hash: null,
            }),
            approved_account_ids: {},
            royalty: {},
        })
    );
});


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
    TRDLBNftTokenMetadataEditOptions,
    TRDLBNftSupplyForOwnerOptions
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
        media: "https://bafkreig5mv42k3x7ukukd762zivobqrxqpj34e3rb2sx5x3o5krbgleu5i.ipfs.nftstorage.link/",
        extra: JSON.stringify(extra),
    }; 

    const options: TRDLBNftMintOptions = {
        token_id: RANDOM_TOKEN_ID,
        receiver_id: config.ACCOUNT_ID,
        metadata: metadata,
    };

    const response = await contract.nft_mint(options);

    expect(response).toBeDefined();
});

test('should increase NFT tokens supply for owner', async () => {
    const { account } = await setupMockupServer(config.PRIVATE_KEY);

    const contract = new TRDLBContract(account, config.CONTRACT_ID);
    
    const nftSupplyForOwnerOptions: TRDLBNftSupplyForOwnerOptions = {
        account_id: account.accountId
    };

    const nftSupplyForOwnerBefore = await contract.nft_supply_for_owner(nftSupplyForOwnerOptions);

    const extra: TRDLBTokenMetadataExtra = {
        durability: 10000, // 100.00 units
        ware: 100, // 1.00 unit burnt per kilometre travelled
        efficiency: 500, // 5.00 tokens earned per energy consumed
        comfort: 200, // 2.00 energy consumed per kilometre travelled
    }

    const metadata: TRDLBJsonTokenMetadata = {
        title: "City Bike",
        description: "A simple bike for travelling across your hometown",
        media: "https://bafkreig5mv42k3x7ukukd762zivobqrxqpj34e3rb2sx5x3o5krbgleu5i.ipfs.nftstorage.link/",
        extra: JSON.stringify(extra),
    }; 

    const options: TRDLBNftMintOptions = {
        token_id: RANDOM_TOKEN_ID + '1',
        receiver_id: config.ACCOUNT_ID,
        metadata: metadata,
    };

    await contract.nft_mint(options);

    const nftSupplyForOwnerAfter = await contract.nft_supply_for_owner(nftSupplyForOwnerOptions);

    expect(nftSupplyForOwnerAfter - nftSupplyForOwnerBefore).toEqual(1);
});

test('should return a list of NFTs on given account', async () => {
    const { account } = await setupMockupServer(config.PRIVATE_KEY);

    const contract = new TRDLBContract(account, config.CONTRACT_ID);
    
    const options: TRDLBNftTokensForOwnerOptions = {
        account_id: config.ACCOUNT_ID,
        from_index: "0",
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
            owner_id: config.ACCOUNT_ID,
            metadata: expect.objectContaining({
                title: "City Bike",
                description: "A simple bike for travelling across your hometown",
                media: "https://bafkreig5mv42k3x7ukukd762zivobqrxqpj34e3rb2sx5x3o5krbgleu5i.ipfs.nftstorage.link/",
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
        media: "https://bafkreibjwkmu5duf5glcw2dvi47c4xc7fminqmlmxby7gtsptx5ziitrpy.ipfs.nftstorage.link/",
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
            owner_id: config.ACCOUNT_ID,
            metadata: expect.objectContaining({
                title: "Sexy Bike",
                description: "The sexiest bike in the whole world!",
                media: "https://bafkreibjwkmu5duf5glcw2dvi47c4xc7fminqmlmxby7gtsptx5ziitrpy.ipfs.nftstorage.link/",
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


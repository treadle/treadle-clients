import { setupMockupServer } from "./MockupServer";
import { expect, test } from "@jest/globals";

import { TRDLBContract, TRDLBTokenMetadata } from "./TRDLBContract";

const PRIVATE_KEY = 'jNpUvccrCML6r4SRYkrVXfyiRDf61pyXh4UP6jwaEjYhVJbM6kWXZn86mt3w6hB4uhr3Xrhw2wmseUVA6Jetd9E'
const CONTRACT_ID = 'dev-1668032831399-31216196638798';

test('should mint a new NFT with given metadata', async () => {
    const { server, near, account } = await setupMockupServer(PRIVATE_KEY);
    const contract = new TRDLBContract(account, CONTRACT_ID);
    
    const metadata: TRDLBTokenMetadata = {
        title: "City Bike",
        description: "A simple bike for travelling across your hometown",
        media: "https://www.thisiscolossal.com/wp-content/uploads/2014/03/120430.gif",
        extra: "Hello, World!",
    }; 

    const response = await contract.nft_mint("pantemon.testnet", metadata);

    expect(response).toBeDefined();
});
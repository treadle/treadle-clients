import {setupMockupServer} from "./MockupServer";
import {expect, test} from "@jest/globals";

test('should mint the bike', async () => {
    const server = await setupMockupServer();

    const data = await server.mintBike("pantemon.testnet");
    expect(data).toBeDefined();
});

test('should fetch the bikes for owner', async () => {
    const server = await setupMockupServer();

    const data = await server.fetchBikesForOwner("pantemon.testnet");
    console.log(data);
    expect(data).toBeDefined();
});
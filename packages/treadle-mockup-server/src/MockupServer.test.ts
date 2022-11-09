import { setupMockupServer } from "./MockupServer";
import { expect, test } from "@jest/globals";

const PRIVATE_KEY = 'jNpUvccrCML6r4SRYkrVXfyiRDf61pyXh4UP6jwaEjYhVJbM6kWXZn86mt3w6hB4uhr3Xrhw2wmseUVA6Jetd9E'

test('should mint the bike', async () => {
    const { server } = await setupMockupServer(PRIVATE_KEY);

    const data = await server.mintBike("pantemon.testnet");
    expect(data).toBeDefined();
});

test('should fetch the bikes for owner', async () => {
    const { server } = await setupMockupServer(PRIVATE_KEY);

    const data = await server.fetchBikesForOwner("pantemon.testnet");
    expect(data).toBeDefined();
});
import { expect, test } from "@jest/globals";

import { RaceStateManager, RaceStateManagerConstructorOptions } from './RaceStateManager';

test('player should consume 10 energy, earn 10 tokens and decrease their racer durability by 2.5 durability units', async () => {
  const options: RaceStateManagerConstructorOptions = {
    energyLeft: 1000, // 10 energy units
    racerDurability: 10000, // 100.00 units
    racerWare: 50, // 1.00 durability units per 
    racerEfficiency: 200, // 2.00 tokens per energy
    racerComfort: 200, // 2.00 energy per kilometre travelled
  }; 
  
  const manager = new RaceStateManager(options);

  for (let i = 0; i < 5; i++) {
    manager.incrementTotalDistanceTravelled();
  }

  expect(manager.state().distanceTravelled).toEqual(5);
  expect(manager.state().energyLeft).toEqual(0);
  expect(manager.state().racerDurability).toEqual(9750);
  expect(manager.state().tokensEarned).toEqual(1000);
});

test('player should run out of energy', async () => {
  const options: RaceStateManagerConstructorOptions = {
    energyLeft: 500, // 5 energy units
    racerDurability: 10000, // 100.00 units
    racerWare: 50, // 1.00 durability units per 
    racerEfficiency: 200, // 2.00 tokens per energy
    racerComfort: 200, // 2.00 energy per kilometre travelled
  }; 
  
  const manager = new RaceStateManager(options);

  const t = () => {
    for (let i = 0; i < 5; i++) {
      manager.incrementTotalDistanceTravelled();
    }
  }

  expect(t).toThrow("NOT ENOUGH ENERGY");
});

test('racer should be broken', async () => {
  const options: RaceStateManagerConstructorOptions = {
    energyLeft: 1000, // 5 energy units
    racerDurability: 100, // 100.00 units
    racerWare: 50, // 1.00 durability units per 
    racerEfficiency: 200, // 2.00 tokens per energy
    racerComfort: 200, // 2.00 energy per kilometre travelled
  }; 
  
  const manager = new RaceStateManager(options);

  const t = () => {
    for (let i = 0; i < 5; i++) {
      manager.incrementTotalDistanceTravelled();
    }
  }

  expect(t).toThrow("RACER IS BROKEN");
});

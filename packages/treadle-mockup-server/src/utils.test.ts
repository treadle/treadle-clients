import { expect, test } from "@jest/globals";
import BN from 'bn.js';

import { ONE_TENTH_OF_A_NEAR } from './utils';

test('should return 0.1 NEAR', async () => {
  expect(ONE_TENTH_OF_A_NEAR()).toEqual(new BN("100000000000000000000000"));
});
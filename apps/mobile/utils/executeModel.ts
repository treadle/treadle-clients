import type { GraphModel, Tensor } from '@tensorflow/tfjs';
import { tensor, losses } from '@tensorflow/tfjs';

export default async function executeModel(model: GraphModel, data: number[][][]) {
  const initTensor = tensor(data);
  const output = (await model.executeAsync(initTensor)) as Tensor;
  const res = await losses.meanSquaredError(initTensor, output).data();
  initTensor.dispose();
  output.dispose();
  return res;
}

import * as tf from '@tensorflow/tfjs';
import { tensor } from '@tensorflow/tfjs';
import { unstable_batchedUpdates } from 'react-native';

export default async function executeModel(model, data) {
    const initTensor = tf.tensor(data);
    const output = await model.executeAsync(initTensor);
    const res = await tf.losses.meanSquaredError(initTensor, output).data();
    initTensor.dispose();
    output.dispose();
    return res;
}

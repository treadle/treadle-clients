import { loadGraphModel } from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

export default async function loadModel() {
    const modelJson = require('../models/model.json');
    const modelWeights = require('../models/model_weights.bin');
    const model = await loadGraphModel(
        bundleResourceIO(modelJson, modelWeights)
    );

    return model;
}

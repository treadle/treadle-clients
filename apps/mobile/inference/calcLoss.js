const LOSS_PERCENTAGE = 0.5;

export default function calcLoss(lossesArr) {
    if (lossesArr.length > 0) {
        let trues = 0;
        for (let i = 0; i < lossesArr.length; i++) {
            if (lossesArr[i]) {
                trues++;
            }
        }

        return trues / lossesArr.length < LOSS_PERCENTAGE;
    }

    return false;
}

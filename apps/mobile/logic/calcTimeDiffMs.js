/* 
LocationObject:
    coords
    timestamp (ms)

*/

export default function calcTimeDiffMs(first_location, second_location) {
    const difference = second_location.timestamp - first_location.timestamp;
    return difference / 1000;
}

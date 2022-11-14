import haversine from 'haversine';
/* 
LocationObject:
    coords
    timestamp

LocationObjectCoords:
    latitude
    longitude

*/

export default function calcDist(first_location, second_location) {
    // Calculate the distance using the Haversine formula (in meters)
    const distance = haversine(first_location.coords, second_location.coords, {
        unit: 'meter',
    });
    return distance;
}

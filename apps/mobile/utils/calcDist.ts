import type { LocationObject } from 'expo-location';
import haversine from 'haversine';

export default function calcDist(
  first_location: LocationObject,
  second_location: LocationObject
): number {
  // Calculate the distance using the Haversine formula (in meters)
  const distance = haversine(first_location.coords, second_location.coords, {
    unit: 'meter',
  });
  return distance;
}

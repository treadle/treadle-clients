import { LocationObject } from 'expo-location';

export default function calcTimeDiffMs(
  first_location: LocationObject,
  second_location: LocationObject
): number {
  const difference = second_location.timestamp - first_location.timestamp;
  return difference / 1000;
}

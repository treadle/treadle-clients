import { Text, View } from 'react-native';

import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View>
      <Text>This screen doesn't exist.</Text>
    </View>
  );
}

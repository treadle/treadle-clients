import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

const TabBarIcon = (props: {
  name: ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) => {
  return <MaterialCommunityIcons size={16} {...props} />;
};

export default TabBarIcon;

import type { FC, PropsWithChildren } from 'react';
import type { To } from '@react-navigation/native/lib/typescript/src/useLinkTo';
import { StackActionType, useLinkProps } from '@react-navigation/native';
import { TouchableRipple } from 'react-native-paper';
import { RobotoRegularText } from './StyledText';

interface LinkButtonProps {
  to: To<ReactNavigation.RootParamList>;
  action?: StackActionType;
}

const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = ({children, to, action, ...rest}) => {
  const { onPress, ...props } = useLinkProps({ to, action });

  return (
    <TouchableRipple className='bg-md3-primary rounded-[100px] py-2.5 px-6 mt-4' {...props} {...rest} onPress={onPress}>
      <RobotoRegularText className='text-md3-on-primary'>
        {children}
      </RobotoRegularText>
    </TouchableRipple>
  );
};

export default LinkButton;
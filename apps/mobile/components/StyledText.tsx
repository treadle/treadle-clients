import { Text, TextProps } from './Themed';

export function RobotoRegularText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Roboto', fontWeight: 'normal' }]} />;
}

export function RobotoMediumText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Roboto-Medium', fontWeight: '500' }]} />;
}

export function RobotoBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Roboto-Bold', fontWeight: 'bold' }]} />;
}

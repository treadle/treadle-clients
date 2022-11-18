import type { FC } from 'react';
import type { FastImageProps } from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import Pie from 'react-native-progress/Pie';
import FastImage from 'react-native-fast-image';
import { MD3DarkTheme } from 'react-native-paper';

const Image = createImageProgress(FastImage);

interface Props extends FastImageProps {
  onError?: () => void | undefined;
}

const CustomImage: FC<Props> = (props) => {
  return (
    <Image
      {...props}
      indicator={Pie}
      indicatorProps={{
        size: 40,
        color: MD3DarkTheme.colors.onPrimaryContainer,
        unfilledColor: MD3DarkTheme.colors.primaryContainer,
      }}
      onError={props.onError}
    />
  );
};
export default CustomImage;
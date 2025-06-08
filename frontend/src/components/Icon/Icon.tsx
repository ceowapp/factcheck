import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
export const IconWrapperImg: React.FC<{
  imageSrc: ImageSourcePropType;
  size?: number;
}> = ({imageSrc, size = 48}) => {
  const imageStyle = {
    width: size,
    height: size,
  };
  return <Image source={imageSrc} style={imageStyle} />;
};

export const Icon16px = {};

export const Icon24px = {};

export const Icon32px = {};

export const Icon36px = {};

export const Icon48px = {};

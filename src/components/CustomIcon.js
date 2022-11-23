import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';

export default CustomIcon = props => {
  const {iconName, onPress, IconSetName, iconSize, style} = props;
  return (
    <TouchableOpacity style={[style, styles.CustomIcon]} onPress={onPress}>
      <IconSetName name={iconName} size={iconSize} color={theme.colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CustomIcon: {
    padding: scale(10),
    borderRadius: scale(5),
    backgroundColor: theme.colors.purpal,
    marginHorizontal: scale(5),
  },
});

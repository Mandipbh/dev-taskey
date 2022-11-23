import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {scale, theme} from '../utils';
import {Label} from './index';
import ICON from 'react-native-vector-icons/Ionicons';

const Button = props => {
  const {onPress, style, title, titleStyle, Icon} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttoncontainer, styles.shadow, style]}>
      {Icon && (
        <ICON
          name={Icon}
          size={scale(28)}
          color={theme.colors.black}
          style={{left: scale(2)}}
        />
      )}
      <Label style={[styles.buttontxt, titleStyle]} title={title} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttoncontainer: {
    justifyContent: 'center',
    marginHorizontal: scale(35),
    backgroundColor: theme.colors.white,
    width: theme.SCREENWIDTH - scale(30),
    alignSelf: 'center',
    borderRadius: scale(18),
    alignItems: 'center',
    marginBottom: scale(13),
    flexDirection: 'row',
    height: theme.SCREENHEIGHT * 0.06,
  },
  buttontxt: {
    fontSize: scale(15),
    color: theme.colors.white,
    fontWeight: '500',
  },
  title: {color: theme.colors.blue, textAlign: 'center'},
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1,
    elevation: 1,
  },
});

export default Button;

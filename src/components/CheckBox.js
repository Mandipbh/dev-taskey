import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../utils';

const CheckBox = props => {
  const {checked, onPress, btnstyle, checkStyle} = props;
  return (
    <TouchableOpacity
      style={[styles.checkboxContainer, btnstyle]}
      onPress={onPress}>
      {checked ? <View style={[styles.check, checkStyle]} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    padding: scale(3),
    borderWidth: scale(1.2),
    height: scale(15),
    width: scale(15),
    borderRadius: scale(7),
    marginHorizontal: scale(6),
    borderColor: theme.colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    backgroundColor: theme.colors.orange,
    height: scale(10),
    width: scale(10),
    borderRadius: scale(5),
  },
});

export default CheckBox;

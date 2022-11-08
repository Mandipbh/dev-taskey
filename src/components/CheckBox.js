import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../utils';

const CheckBox = props => {
  const [isCheck, setCheck] = useState(false);
  const {checked, onPress} = props;
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      {checked ? (
        <Icon name="check" color={theme.colors.black} size={scale(18)} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    padding: scale(1),
    borderWidth: scale(1),
    height: scale(20),
    width: scale(20),
  },
});

export default CheckBox;

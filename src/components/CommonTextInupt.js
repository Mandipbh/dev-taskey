import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Label} from './Label';
import {scale, theme} from '../utils';

const CommonTextInupt = props => {
  const {
    LabelIcon,
    placeholder,
    Labeltitle,
    onChangeText,
    keyboardType,
    maxLength,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <AntDesign
          name={LabelIcon}
          size={scale(16)}
          color={theme.colors.gray}
        />
        <Label title={Labeltitle} style={styles.labelText} />
      </View>
      <TextInput
        style={styles.textinput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
};

export default CommonTextInupt;

const styles = StyleSheet.create({
  container: {
    paddingTop: scale(20),
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: theme.colors.gray,
    fontSize: 16,
    left: scale(5),
  },
  textinput: {
    borderWidth: 1,
    paddingHorizontal: scale(15),
    marginTop: scale(10),
    borderColor: theme.colors.gray,
    borderRadius: scale(10),
    fontSize: 18,
    paddingVertical: scale(8),
  },
});

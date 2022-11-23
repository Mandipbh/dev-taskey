import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../utils';
import {Label, Title} from '../Label';
import Button from '../Button';

const ComplateTaskModel = props => {
  const {isVisible, close} = props;
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Title title="Title of the Task" />
          <Icon
            name="x"
            size={scale(20)}
            color={theme.colors.black}
            onPress={close}
          />
        </View>

        <View style={styles.counterMain}>
          <View style={styles.counterView}>
            <Icon name="plus" color={theme.colors.black} size={scale(20)} />
            <TextInput
              style={styles.input}
              placeholder={'5'}
              placeholderTextColor={theme.colors.black}
            />
            <Icon name="minus" color={theme.colors.black} size={scale(20)} />
          </View>
          <Label title="Total Progress 10" />
        </View>
        <TouchableOpacity style={styles.AddBtn} onPress={close}>
          <Label title="Add" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ComplateTaskModel;

const styles = StyleSheet.create({
  container: {
    height: theme.SCREENHEIGHT / 4,
    backgroundColor: theme.colors.white,
    padding: scale(10),
    borderRadius: scale(5),
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterView: {
    flexDirection: 'row',
    padding: scale(10),
    alignItems: 'center',
  },
  counterMain: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  AddBtn: {
    padding: scale(8),
    borderRadius: scale(10),
    borderWidth: scale(1),
    width: scale(80),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: scale(50),
    height: scale(40),
    borderBottomWidth: scale(1),
    borderBottomColor: theme.colors.black,
    marginHorizontal: scale(10),
    textAlign: 'center',
    fontSize: scale(14),
  },
});

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/Entypo';
import {scale, theme} from '../../utils';
import {Label} from '../Label';
import {useNavigation} from '@react-navigation/native';
import CreateFolderModel from './CreateFolderModel';
import {useSelector} from 'react-redux';
export default PayScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newFolderM, setnewFolderM] = useState(false);
  const navigation = useNavigation();
  const darkmodeState = useSelector(state => state.UserReducer.isDarkMode);
  const isSelected = props?.focus?.accessibilityState?.selected;
  return (
    <>
      <View>
        <Icon2
          name="circle-with-plus"
          size={scale(22)}
          color={
            darkmodeState
              ? isSelected
                ? theme.colors.main
                : theme.colors.icon
              : theme.colors.white
          }
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.btn}
        />
        {/* <Label
          title="Add"
          style={[
            styles.lbl,
            {
              color: darkmodeState
                ? isSelected
                  ? theme.colors.main
                  : theme.colors.icon
                : theme.colors.white,
            },
          ]}
        /> */}
      </View>
      <View style={styles.container}>
        <Modal
          backdropOpacity={0}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.bottomtab}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('CreateFolder');
              }}>
              <Icon1
                name="clipboard-notes"
                size={scale(30)}
                color={theme.colors.white}
              />
              <Label title="Task" style={styles.contentTitle} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomtab}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('CreateF');
              }}>
              <Icon name="folder" size={scale(26)} color={theme.colors.white} />
              <Label title="Folder" style={styles.contentTitle} />
            </TouchableOpacity>
          </View>
        </Modal>
        <CreateFolderModel
          isVisible={newFolderM}
          close={() => {
            setnewFolderM(false);
          }}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.main,
    padding: scale(4),
    paddingTop: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: scale(14),
    fontWeight: '600',
    color: theme.colors.white,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
    width: scale(101),
    // alignSelf: 'center',
    marginLeft: '50%',
    bottom: Platform.OS === 'ios' ? '8%' : '5%',
  },
  bottomtab: {paddingVertical: scale(7), alignItems: 'center'},
  btn: {
    paddingHorizontal: scale(35),
    marginTop: Platform.OS === 'ios' ? scale(8) : scale(15),
  },
  lbl: {
    fontSize: scale(10),
    marginTop: scale(1),
    textAlign: 'center',
  },
});

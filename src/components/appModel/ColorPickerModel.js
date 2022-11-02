import React, {useRef} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import {TriangleColorPicker} from 'react-native-color-picker';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../utils';
import {Title, Label} from '../Label';

const ColorPickerModel = props => {
  const {isVisible, close, title, subTitle} = props;
  const colorPicker = useRef(null);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.colorPanel}>
          <TriangleColorPicker
            onColorSelected={color => close(color)}
            style={{flex: 1}}
            ref={colorPicker}
          />
          {/* <Icon name="x" size={scale(22)} style={styles.closeIcon} /> */}
          <Label title="Click color close" style={styles.closelbl} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: scale(20),
    backgroundColor: '#00000020',
    zIndex: 111,
  },
  label: {textAlign: 'center', color: theme.colors.black},

  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(7),
    // paddingHorizontal:scale(10),
    // marginVertical:scale(8)
  },
  colorPanel: {
    flex: 1,
    width: '100%',
    padding: 45,
    backgroundColor: theme.colors.white,
    margin: 0,
  },
  divider: {
    width: '112%',
    alignSelf: 'center',
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
    overflow: 'hidden',
  },
  subTitleView: {
    paddingVertical: scale(20),
  },
  closeIcon: {alignSelf: 'center', marginTop: scale(-25)},
  closelbl: {alignSelf: 'center', marginTop: scale(5)},
});

export default ColorPickerModel;

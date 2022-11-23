import React, {useRef} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {TriangleColorPicker} from 'react-native-color-picker';
import {scale, theme} from '../../utils';
import {Label} from '../Label';

const ColorPickerModel = props => {
  const {isVisible, close} = props;
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

  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(7),
  },
  colorPanel: {
    flex: 1,
    width: '100%',
    padding: scale(45),
    backgroundColor: theme.colors.white,
    margin: 0,
  },
  closelbl: {alignSelf: 'center', marginTop: scale(5)},
});

export default ColorPickerModel;

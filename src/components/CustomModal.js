import React from 'react';
import * as Animatable from 'react-native-animatable';
import {theme} from '../utils';

const CustomModal = props => {
  const {ModalHeight, children} = props;
  return (
    <Animatable.View
      animation="zoomIn"
      style={{
        backgroundColor: theme.colors.lightpurpal,
        height: ModalHeight,
        borderRadius: scale(20),
        marginHorizontal: scale(4),
        paddingHorizontal: scale(20),
        paddingVertical: scale(25),
        alignItems: 'center',
      }}>
      {children}
    </Animatable.View>
  );
};

export default CustomModal;

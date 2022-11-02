import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const FullScreenModal = props => {
  const {show, close} = props;
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text>FullScreenModal</Text>
    </View>
  );
};

export default FullScreenModal;

const styles = StyleSheet.create({});

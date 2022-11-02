import {SafeAreaView, StyleSheet} from 'react-native';
import React, {Children} from 'react';
import {theme} from '../utils';

export default function Container(props) {
  return <SafeAreaView style={styles.container}>{Children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

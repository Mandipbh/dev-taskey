import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {theme} from '../../utils';

const StatisticsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Statistics Screen</Text>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {theme} from '../../utils';

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SettingScreen</Text>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

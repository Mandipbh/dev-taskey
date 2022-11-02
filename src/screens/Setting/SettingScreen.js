import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {theme} from '../../utils';
import CommonHeader from '../../components/CommonHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader IconType={AntDesign} />
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

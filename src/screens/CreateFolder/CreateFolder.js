import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale, theme} from '../../utils';
import CommonHeader from '../../components/CommonHeader';

const CreateFolder = () => {
  return (
    <>
      <CommonHeader
        headerTitle="Categories"
        iconName="pluscircleo"
        IconType={AntDesign}
      />
      <View style={styles.container}>
        <Text>CreateFolder</Text>
      </View>
    </>
  );
};

export default CreateFolder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

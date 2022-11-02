import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../utils';

const CommonHeader = props => {
  const {headerTitle, onRightIconPress, iconName, IconType} = props;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: headerTitle,
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerLeftIcon}
          onPress={onRightIconPress}>
          <IconType name={iconName} size={25} />
        </TouchableOpacity>
      ),
    });
  });
};

export default CommonHeader;

const styles = StyleSheet.create({
  headerLeftIcon: {
    right: scale(15),
  },
});

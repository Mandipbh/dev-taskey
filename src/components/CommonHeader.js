import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {scale, theme} from '../utils';

const CommonHeader = props => {
  const {
    headerTitle,
    onRightIconPress,
    iconName,
    IconType,
    IconColor,
    backButton,
    headerLeft,
  } = props;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: backButton,
      title: headerTitle,
      headerTitleAlign: 'left',
      headerLeft: headerLeft,

      headerRight: () => (
        <TouchableOpacity
          style={styles.headerLeftIcon}
          onPress={onRightIconPress}>
          {iconName && (
            <IconType
              name={iconName}
              size={25}
              color={IconColor ? IconColor : theme.colors.black}
            />
          )}
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

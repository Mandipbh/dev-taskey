import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, Label, TextInput, Title} from '../../components';
import {CommonStyles} from './CommonStyles';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scale, theme} from '../../utils';

const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView
      style={CommonStyles.container}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={CommonStyles.container}>
        <AntDesign
          name="left"
          size={25}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
          color={theme.colors.primary}
        />
        <View style={CommonStyles.TitleStyle}>
          <Title title="Forgot password" style={CommonStyles.TitleTextStyle} />
        </View>
        <View style={CommonStyles.secondContainer}>
          <Title style={CommonStyles.secondTitle} title="Forget password" />
          <TextInput
            LabelIcon="user"
            Labeltitle="Email"
            placeholder="Enter your email"
          />

          <Button
            style={CommonStyles.btn}
            title="Submit"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
const styles = StyleSheet.create({
  backIcon: {
    marginLeft: scale(10),
    marginTop: scale(15),
  },
});

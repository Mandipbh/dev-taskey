import {StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Label, TextInput, Title} from '../../components';
import {CommonStyles} from './CommonStyles';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scale, theme} from '../../utils';

const SignIn = () => {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView
      style={CommonStyles.container}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={CommonStyles.container}>
        <View style={CommonStyles.TitleStyle}>
          <Title title="Welcome Back" style={CommonStyles.TitleTextStyle} />
        </View>
        <View style={CommonStyles.secondContainer}>
          <Title style={CommonStyles.secondTitle} title="Login" />
          <TextInput
            LabelIcon="mobile1"
            Labeltitle="Phone Number"
            placeholder="Enter Phone Number"
          />
          <TouchableOpacity style={{alignSelf: 'flex-end'}}>
            <Label style={styles.Sendcode}>Send Code</Label>
          </TouchableOpacity>
          <TextInput
            LabelIcon="message1"
            Labeltitle="OTP"
            placeholder="Enter OTP"
          />
          <Button
            style={CommonStyles.btn}
            title="Login"
            onPress={() => {
              navigation.navigate('Tabs');
            }}
          />
          <View style={CommonStyles.navTxtContainer}>
            <Label title="Are you a new User ?" />
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Label style={CommonStyles.navTxt} title="Sign Up" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  navTxt: {
    textAlign: 'center',
    fontSize: scale(14),
  },
  Sendcode: {
    color: theme.colors.primary,
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: scale(-15),
    paddingTop: 5,
  },
});

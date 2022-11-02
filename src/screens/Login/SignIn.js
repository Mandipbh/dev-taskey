import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Button, Label, TextInput, Title} from '../../components';
import {CommonStyles} from './CommonStyles';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
            LabelIcon="user"
            Labeltitle="User Name/Email"
            placeholder="Enter your username"
          />
          <TextInput
            LabelIcon="lock"
            Labeltitle="password"
            placeholder="Enter your password"
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
const styles = StyleSheet.create({});

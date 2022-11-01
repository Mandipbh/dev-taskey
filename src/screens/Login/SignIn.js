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

const SignIn = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={CommonStyles.TitleStyle}>
        <Title title="Welcome Back" style={CommonStyles.TitleTextStyle} />
      </View>
      <View style={CommonStyles.secondContainer}>
        <Text style={CommonStyles.secondTitle}>Login</Text>
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
        <Button style={CommonStyles.btn} title="Login" />
        <View style={CommonStyles.navTxtContainer}>
          <Label title="Are you a new User ?" />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={CommonStyles.navTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
const styles = StyleSheet.create({});

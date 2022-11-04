import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Login, SignUp} from '../screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from '../screens/Login/ForgotPassword';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default LoginStack;

const styles = StyleSheet.create({});

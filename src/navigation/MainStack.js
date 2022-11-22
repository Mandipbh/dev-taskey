import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginStack from './LoginStack';
import BottomTab from './BottomTab';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateTask, TaskDetails} from '../screens';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const isLogin = useSelector(state => state.UserReducer.login);
  console.log('is loading >> ', isLogin);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={isLogin ? 'Tabs' : 'LoginStack'}>
      <Stack.Screen name="LoginStack" component={LoginStack} />
      <Stack.Screen name="Tabs" component={BottomTab} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginStack from './LoginStack';
import BottomTab from './BottomTab';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateTask, TaskDetails} from '../screens';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="LoginStack" component={LoginStack} /> */}
      <Stack.Screen name="Tabs" component={BottomTab} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});

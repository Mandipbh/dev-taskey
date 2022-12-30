import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Home} from '../screens';
import AllTasks from '../screens/Home/AllTasks';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      defaultScreenOptions={{
        gestureResponseDistance: {vertical: 200, horizontal: 150},
      }}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AllTask" component={AllTasks} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});

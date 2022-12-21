import {StyleSheet} from 'react-native';
import React from 'react';
import LoginStack from './LoginStack';
import BottomTab from './BottomTab';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateTask, TaskDetails, CreateFolder} from '../screens';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const isLogin = useSelector(state => state.UserReducer.login);
  const userDetails = useSelector(state => state.UserReducer.userDetails);
  axios.defaults.headers.common.Authorization = `Bearer ${userDetails?.token}`;
  console.log('userDetails?.tokenuserDetails?.token', userDetails?.token);
  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      headerColor: '#404040',
      iconColor: '#FFFfff',
      tabBarIcon: '#FFFfff',
      textColor: '#FFFfff',
    },
  };

  const customDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,

      iconColor: 'black',
      tabBarIcon: 'red',
      textColor: 'black',
    },
  };
  return (
    <NavigationContainer theme={customDarkTheme}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={isLogin ? 'Tabs' : 'LoginStack'}>
        <Stack.Screen name="LoginStack" component={LoginStack} />
        <Stack.Screen name="Tabs" component={BottomTab} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="CreateF" component={CreateFolder} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

const styles = StyleSheet.create({});

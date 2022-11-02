import React from 'react';
import {Home, Setting, Statistics, CreateTask, CreateFolder} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {scale, theme} from '../utils';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: theme.colors.black,
          paddingTop: scale(20),
          borderRadius: scale(15),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="home"
                size={scale(19)}
                color={focused ? theme.colors.white : theme.colors.gray}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Entypo
                name="bar-graph"
                size={scale(19)}
                color={focused ? theme.colors.white : theme.colors.gray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="CreateFolder"
        component={CreateFolder}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="folderopen"
                size={scale(19)}
                color={focused ? theme.colors.white : theme.colors.gray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="setting"
                size={scale(19)}
                color={focused ? theme.colors.white : theme.colors.gray}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

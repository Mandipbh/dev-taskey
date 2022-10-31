import React from 'react';
import {Home, Setting, Statistics, CreateTask} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {theme} from '../utils';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="home"
                size={25}
                color={focused ? theme.colors.black : theme.colors.gray}
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
                size={25}
                color={focused ? theme.colors.black : theme.colors.gray}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="CreateTask"
        component={CreateTask}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="pluscircleo"
                size={25}
                color={focused ? theme.colors.black : theme.colors.gray}
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
                size={25}
                color={focused ? theme.colors.black : theme.colors.gray}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

import React from 'react';
import {Home, Setting, CreateFolder, CreateTask} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {scale, theme} from '../utils';
import StatisticsStack from './StatisticsStack';
import {Platform} from 'react-native';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: theme.colors.black,
          paddingTop: Platform.OS === 'ios' ? scale(20) : 0,
          borderTopLeftRadius: scale(15),
          borderTopRightRadius: scale(15),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
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
        name="StatisticsStack"
        component={StatisticsStack}
        options={{
          headerShown: false,
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
        component={CreateTask}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="plus"
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

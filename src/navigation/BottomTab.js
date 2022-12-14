import React from 'react';
import {Home, Setting, CreateTask} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale, theme} from '../utils';
import StatisticsStack from './StatisticsStack';
import {Platform} from 'react-native';
import HomeStack from './HomeStack';
import ColorPickerModel from '../components/appModel/ColorPickerModel';
import PayScreenModal from '../components/appModel/PayScreenModal';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: theme.colors.main,
          paddingTop: Platform.OS === 'ios' ? scale(20) : scale(8),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Entypo name="home" size={scale(20)} color={theme.colors.white} />
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
                size={scale(20)}
                color={theme.colors.white}
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
                name="pluscircle"
                size={scale(20)}
                color={theme.colors.white}
              />
            );
          },
          tabBarButton: () => <PayScreenModal />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name="ios-settings-sharp"
                size={scale(20)}
                color={theme.colors.white}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

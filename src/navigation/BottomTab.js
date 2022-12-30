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
import PayScreenModal from '../components/appModel/PayScreenModal';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const darkmodeState = useSelector(state => state.UserReducer.isDarkMode);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: darkmodeState
            ? theme.colors.darkMode
            : theme.colors.main,
          // paddingTop: Platform.OS === 'ios' ? scale(5) : scale(8),
          justifyContent: 'center',
          alignContent: 'center',
          height: Platform.OS === 'ios' ? scale(65) : scale(55),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'home',
          tabBarIcon: ({focused}) => {
            return (
              <Entypo
                name="home"
                size={scale(20)}
                color={
                  darkmodeState
                    ? focused
                      ? theme.colors.main
                      : theme.colors.icon
                    : theme.colors.white
                }
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="StatisticsStack"
        component={StatisticsStack}
        options={{
          tabBarLabel: 'stats',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Entypo
                name="bar-graph"
                size={scale(20)}
                color={
                  darkmodeState
                    ? focused
                      ? theme.colors.main
                      : theme.colors.icon
                    : theme.colors.white
                }
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="CreateFolder"
        component={CreateTask}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({focused}) => {
            return <AntDesign name="pluscircle" size={scale(20)} />;
          },
          tabBarButton: props => <PayScreenModal focus={props} />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: 'settings',
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name="ios-settings-sharp"
                size={scale(20)}
                color={
                  darkmodeState
                    ? focused
                      ? theme.colors.main
                      : theme.colors.icon
                    : theme.colors.white
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

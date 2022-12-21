import React, {useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
import {store, persistor} from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import {LogBox} from 'react-native';

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

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ... ']);
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>
  );
};
export default App;

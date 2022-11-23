import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import {LogBox} from 'react-native';
import Store from './src/redux/Store';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ... ']);
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <MainStack />
      </Provider>
    </NavigationContainer>
  );
};
export default App;

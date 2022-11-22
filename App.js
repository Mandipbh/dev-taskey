import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
// import {store, persistor} from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './src/navigation/BottomTab';
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
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <MainStack />
        {/* </PersistGate> */}
      </Provider>
    </NavigationContainer>
  );
};
export default App;

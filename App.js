import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './src/navigation/BottomTab';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {theme} from './src/utils';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BottomTab />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};
export default App;

import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './src/navigation/BottomTab';
import MainStack from './src/navigation/MainStack';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <BottomTab /> */}
          <MainStack />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};
export default App;

import React from 'react';
import {LogBox, StyleSheet, Text, View, Image} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {store, persistor} from './src/redux/Store';
import * as Progress from 'react-native-progress';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './src/navigation/MainStack';
import {images, scale, theme} from './src/utils';
import {StripeProvider} from '@stripe/stripe-react-native';

class SplashScreen extends React.Component {
  render() {
    const viewStyles = [styles.container, {backgroundColor: theme.colors.main}];
    const textStyles = {
      color: theme.colors.white,
      fontSize: scale(25),
      fontWeight: 'bold',
    };
    const appIcon = {
      width: scale(100),
      resizeMode: 'contain',
      height: scale(100),
    };
    return (
      <View style={viewStyles}>
        <Image source={images.appIcon} style={appIcon} />
        <Text style={[textStyles, {marginTop: scale(5)}]}>taskey</Text>
        <View
          style={{
            marginTop: theme.SCREENHEIGHT * 0.03,
            justifyContent: 'center',
          }}>
          <Progress.Bar
            animated
            indeterminate={true}
            indeterminateAnimationDuration={2000}
            width={scale(110)}
            style={{marginVertical: scale(5), color: theme.colors.white}}
            color={theme.colors.white}
            unfilledColor={theme.colors.gray}
            borderWidth={0}
            height={scale(7)}
          />
          <Text
            style={[textStyles, {fontSize: scale(12), textAlign: 'center'}]}>
            loading...
          </Text>
        </View>
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLoading: true};
  }

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    LogBox.ignoreLogs(['Warning: ... ']);
    LogBox.ignoreAllLogs();
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({isLoading: false});
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    // testing key  sk_test_51MlxMxGnpcNWnmr4OsPoJehA4sLw3UQ2Rx5oWVCgGbwFpJyUcAYNGPKKr2FqQr9Vge8BNcACw2092uFxhPBEOFqu00kgUhSkyU
    // live Key pk_live_51MlxMxGnpcNWnmr4seKYiRzbC7TimouXFpOVNePCSPMxadzLkYYP0NrFYGmOg6l1C2gLd23ES1V6gQ8aJXUdGnpk00D492AeVV
    return (
      <StripeProvider publishableKey="pk_test_51MlxMxGnpcNWnmr4ogYVgxm4N4L2dL8WBQYwQpsrjr3xzx1xGJ6JFDdGtYAYCyaVOUy2o3U5s5ocTOLcpb4Grdsy00Vrd34Miq">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainStack />
          </PersistGate>
        </Provider>
      </StripeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

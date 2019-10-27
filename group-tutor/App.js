import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { View, Text } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import VerifyScreen from './screens/VerifyScreen';
import MainStudent from './screens/MainStudent';

const RootSwitch = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    Verify: VerifyScreen,
    MainStudent: MainStudent,
  },
  {
    initialRouteName: 'Splash',
  }
);

const AppContainer = createAppContainer(RootSwitch);

export default class App extends React.Component {
    state = {
      fontLoaded: false,
    }
    async componentWillMount() {
      await Expo.Font.loadAsync({
        'SFPro': require('./assets/fonts/SFProText-Light.otf'),
        'SFProReg': require('./assets/fonts/SFProReg.otf'),
        'SFProSemi': require('./assets/fonts/SFProSemi.otf'),
      });
      this.setState({ fontLoaded: true });
    }
  
  renderApp() {
    if (this.state.fontLoaded == true) {
      return <AppContainer />;
    } else {
      return <View></View>;
    }
  }

  render() {
    return this.renderApp();
  }
}
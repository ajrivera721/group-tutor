import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
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

export default class App extends Component {

  render() {
    return <AppContainer />;
  }
}
import React, { Component } from 'react';
import { View } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

class QueueScreen extends Component {
    static navigationOptions = {
      drawerLabel: 'Queue',
    };
  
    render() {
      return (
        <View></View>
      );
    }
  }
  
  class TutorScreen extends Component {
    static navigationOptions = {
      drawerLabel: 'Tutor',
    };
  
    render() {
      return (
        <View></View>
      );
    }
  }

  class HistoryScreen extends Component {
    static navigationOptions = {
      drawerLabel: 'History',
    };
  
    render() {
      return (
        <View></View>
      );
    }
  }
  
  const DrawerNavigator = createDrawerNavigator({
    Queue: {
      screen: QueueScreen,
    },
    Tutors: {
      screen: TutorScreen,
    },
    History: {
        screen: HistoryScreen,
    },
  });
  
  export default createAppContainer(DrawerNavigator);
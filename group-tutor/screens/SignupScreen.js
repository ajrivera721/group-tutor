import React, { Component } from 'react';
import { View } from 'react-native';
import SignupForm from '../components/SignupForm';

export default class SignupScreen extends Component {
  
    static navigationOptions = {
        
    };
  
    render() {
      return (
          <View style={{flex: 1}}>
          
          <View style={{flex: 1, justifyContent: 'center'}}>
            <SignupForm />
          </View>
        </View>
      );
    }
  }
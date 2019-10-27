import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SignupForm from '../components/SignupForm';

export default class SignupScreen extends Component {
  
    static navigationOptions = {
        
    };
  
    render() {
      return (
        <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          
        </View>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <SignupForm />
          <Text style={{alignSelf: 'center', marginTop: 20, color: '#000', fontFamily: 'SFPro'}}>Already have an account?</Text>
          <Text 
          style={{alignSelf: 'center', marginTop: 10, color: 'blue', fontFamily: 'SFPro'}}
          onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
        </View>
      </View>
      );
    }
  }
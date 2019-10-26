import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import LoginForm from '../components/LoginForm';
import { withNavigation } from 'react-navigation';

class LoginScreen extends Component {
  
    static navigationOptions = {
        header: null
    };
  
    render() {
      return (
          <View style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            
          </View>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <LoginForm />
            <Text style={{alignSelf: 'center', marginTop: 20, color: '#000'}}>Don't have an account?</Text>
            <Text 
            style={{alignSelf: 'center', marginTop: 10, color: 'blue'}}
            onPress={() => this.props.navigation.navigate('Signup')}>Sign up</Text>
          </View>
        </View>
      );
    }
  }
  
  const styles = {
    imageStyle: {
      flex: 1,
      flexDirection: 'column',
      width: '50%',
      height: '50%',
      alignSelf: 'center',
      justifyContent: 'flex-start',
      resizeMode: 'contain'
    }
  };

export default withNavigation(LoginScreen);
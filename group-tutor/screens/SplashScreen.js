import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';

class SplashScreen extends Component {

    componentWillMount() {

        firebase.initializeApp({
            apiKey: "AIzaSyAFOJgGkme_mv0xWOp9gHOWUXl8WxBaumU",
            authDomain: "group-tutor.firebaseapp.com",
            databaseURL: "https://group-tutor.firebaseio.com",
            projectId: "group-tutor",
            storageBucket: "group-tutor.appspot.com",
            messagingSenderId: "19631574776",
            appId: "1:19631574776:web:da72065f160172341eb50d",
            measurementId: "G-VSW7K4N2XF"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              this.onLoginSuccess();
            } else {
              // No user is signed in.
              this.onLoginFail();
            }
         });
    }

    onLoginSuccess() {
        if (firebase.auth().currentUser.emailVerified) {
            this.props.navigation.navigate('MainStudent');
        } else {
            this.props.navigation.navigate('Verify');
        }
    }

    onLoginFail() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return <View style={{flex: 1}}></View>;
    }
}

export default withNavigation(SplashScreen);
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection } from '../components/common';
import { withNavigation } from 'react-navigation';

class VerifyScreen extends Component {

    static navigationOptions = {
        header: null
    };

    render () {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                    style={{alignSelf: 'center', textAlign: 'center', color: '#000', padding: 35}}
                    >A confirmation has been sent to the email you registered with. 
                    Please click the link in order to verify your account.</Text>
                    <Card>
                        <CardSection>
                    <Button
                    onPress={() => firebase.auth().currentUser.sendEmailVerification()}>
                        Resend Verification
                    </Button>
                    </CardSection>
                    </Card>
                </View>
            </View>
        );
    }
}

export default withNavigation(VerifyScreen);
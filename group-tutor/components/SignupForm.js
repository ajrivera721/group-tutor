import React, { Component } from 'react';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class SignupForm extends Component {
    state = {email: '', password: '', error:'', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({error: '', loading: true });

        firebase.auth().createUserWithEmailAndPassword(email + ".edu", password)
            .then(this.onSignupSuccess.bind(this))
            .catch(this.onSignupFail.bind(this));
    }

    onSignupSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        
        firebase.auth().currentUser.sendEmailVerification();
        this.props.navigation.navigate('Verify');
    }

    onSignupFail() {
        this.setState({
            error: 'Something went wrong.',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small' />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Sign Up
            </Button>
        );
    }

    render () {
        return (
            <Card>
                <CardSection>
                    <Input
                    placeholder="user@ucsd"
                    label="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                    
                    <Text style={styles.textStyle}>
                        .edu
                    </Text>
                </CardSection>

                <CardSection>
                    <Input
                    secureTextEntry={true}
                    placeholder="password"
                    label="Password"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    textStyle: {
        color: '#fff',
        fontSize: 18,
        alignSelf: 'center',
        marginRight: 55,
        marginTop: 3,
        padding: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'black',
        backgroundColor: 'black',
        fontFamily: 'SFPro'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        fontFamily: 'SFPro'
    }
};

export default withNavigation(SignupForm);
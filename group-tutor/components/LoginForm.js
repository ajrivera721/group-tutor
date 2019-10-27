import React, { Component } from 'react';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = {email: '', password: '', error:'', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        if (firebase.auth().currentUser.emailVerified) {
            this.props.navigation.navigate('MainStudent');
        } else {
            firebase.auth().currentUser.sendEmailVerification();
            this.props.navigation.navigate('Verify');
        }
    }

    onLoginFail() {
        this.setState({
            error: 'Invalid Email/Password.',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size='large' />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
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
        borderColor: 'blue',
        backgroundColor: 'blue',
        fontFamily: 'SFPro'
    },
    errorTextStyle: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'red',
        fontFamily: 'SFPro'
    }
};

export default withNavigation(LoginForm);
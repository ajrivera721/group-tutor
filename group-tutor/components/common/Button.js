import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '300',
        paddingTop: 20,
        paddingBottom: 20,
        fontFamily: 'SFPro'
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'black',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: 50,
        marginRight: 50
    }
};

export { Button };
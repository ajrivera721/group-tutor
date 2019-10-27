import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const CircleButton = ({ onPress, children }) => {
    const { containerStyle, buttonStyle, textStyle } = styles;

    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={onPress} style={buttonStyle}>
                
            </TouchableOpacity>
            <Text style={textStyle}>
                {children}
            </Text>
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10
    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 10,
        fontFamily: 'SFPro'
    },
    buttonStyle: {
        width: 75,
        height: 75,
        borderRadius: 75/2,
        backgroundColor: '#C62139'
    }
};

export { CircleButton };
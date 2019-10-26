import React from 'react';
import { Text, View, StatusBar } from 'react-native';

const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevaton: 2,
    },
    textStyle: {
        fontSize: 20
    }
};

export { Header };
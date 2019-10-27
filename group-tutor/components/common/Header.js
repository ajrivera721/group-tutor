import React from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';

const Header = ({onPress}) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <TouchableOpacity
            activeOpacity={.5}
            onPress={onPress}
            >
            <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/images/menu-button.png")}
            />
            </TouchableOpacity>
            
            <Button
            onPress={() => alert('This will display the classes you are enrolled in.')}
            title="CSE 100"
            color='blue'
            />
        </View>
    );
};

const styles = {
    viewStyle: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        shadowColor: '#000',
    },
    textStyle: {
        fontSize: 20
    }
};

export { Header };
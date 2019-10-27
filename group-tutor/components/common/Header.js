import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

const Header = () => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Image
            style={{ width: 30, height: 30, marginRight: 30 }}
            source={require("../../assets/images/unlocked.png")}
            />
            
            <TouchableOpacity>
                <Text style={textStyle}>CSE 100</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{fontFamily: 'SFProReg', width: 60, fontSize: 14}}>Logout</Text>
            </TouchableOpacity>
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
        fontSize: 25,
        fontFamily: 'SFProSemi',
        textAlign: 'center'
    }
};

export { Header };
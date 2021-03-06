import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        justifyContent: 'flex-start',
        alignSelf: 'center',
        flexDirection: 'row'
    }
};

export { CardSection };
import React from 'react';
import { View } from 'react-native';

const QueueCard = (props) => {
    return (
        <View style = {[styles.containerStyle, {backgroundColor: props.color}]}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0,
    }
};

export default QueueCard;
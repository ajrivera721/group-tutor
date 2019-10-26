import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, PanResponder } from 'react-native';
import Constants from 'expo-constants';

const {width} = Dimensions.get('window');

class QueueItem extends React.Component {
    render() {
        return (
        <View style={styles.queueItem}>
            <Animated.View 
            style={[this.state.position.getLayout()]} 
            {...this.panResponder.panHandlers}
            >
            <View style={styles.absoluteCell}>
                <Text style={styles.absoluteCellText}>DELETE</Text>
            </View>
            <View style={styles.innerCell}>
                <Text>
                {this.props.text}
                </Text>
            </View>
            </Animated.View>
        </View>
        );
    }
}

const styles = {
    queueItem: {
        height: 80,
        marginLeft: -100,
        justifyContent: 'center',
        backgroundColor: 'red',
      },
    absoluteCell: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    innerCell: {
        width: width,
        height: 80,
        marginLeft: 100,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export { QueueItem };
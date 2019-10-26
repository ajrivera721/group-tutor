import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, PanResponder, Animated } from 'react-native';
import Constants from 'expo-constants';

const {width} = Dimensions.get('window');

class QueueItem extends React.Component {
    constructor(props) {
        super(props);
      
        this.gestureDelay = -35;
        this.scrollViewEnabled = true;
      
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (evt, gestureState) => false,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onPanResponderTerminationRequest: (evt, gestureState) => false,
          onPanResponderMove: (evt, gestureState) => {
            if (gestureState.dx > 35) {
              this.setScrollViewEnabled(false);
              let newX = gestureState.dx + this.gestureDelay;
              position.setValue({x: newX, y: 0});
            }
          },
          onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx < 150) {
              Animated.timing(this.state.position, {
                toValue: {x: 0, y: 0},
                duration: 150,
              }).start(() => {
                this.setScrollViewEnabled(true);
              });
            } else {
              Animated.timing(this.state.position, {
                toValue: {x: width, y: 0},
                duration: 300,
              }).start(() => {
                this.props.success(this.props.text);
                this.setScrollViewEnabled(true);
              });
            }
          },
        });
      
        this.panResponder = panResponder;
        this.state = {position};
      }

      setScrollViewEnabled(enabled) {
        if (this.scrollViewEnabled !== enabled) {
          this.props.setScrollEnabled(enabled);
          this.scrollViewEnabled = enabled;
        }
      }

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
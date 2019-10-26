import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { QueueItem } from '.';



class SwipeableQueue extends React.Component {
	// constructor method begins here:
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

  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }

  success(key) {
    const data = this.state.data.filter(item => item.key !== key);
    this.setState({
      data,
    });
  }
    
  renderItem(item) {
    return (
      <QueueItem
        text={item.key}
        success={this.success}
        setScrollEnabled={enable => this.setScrollEnabled(enable)}
      />
    );
  }

  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.state.data}
        renderItem={({item}) => this.renderItem(item)}
        scrollEnabled={this.state.enable}
      />
    );
  }
}

export { SwipeableQueue };
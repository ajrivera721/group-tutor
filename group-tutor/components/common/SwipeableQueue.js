import React, { Component } from 'react';
import { FlatList, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import { QueueItem } from '.';



class SwipeableQueue extends React.Component {
	// constructor method begins here:
    constructor(props) {
        super(props);
        this.renderSeparator = this.renderSeparator.bind(this);
        this.success = this.success.bind(this);
        this.setScrollEnabled = this.setScrollEnabled.bind(this);
    
        this.state = {
          enable: true,
          data: this.props.data,
        };
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
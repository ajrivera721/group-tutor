import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import { Button, Header, SwipeableQueue } from '../components/common';

const listData = [
    {key: 'test1'},
    {key: 'test2'},
    {key: 'test3'},
];

class QueueScreen extends Component {
    static navigationOptions = {
      drawerLabel: 'Queue',
      drawerIcon: (
          <Image
          style = {{ width: 24, height: 24 }}
          source={require("../assets/images/queue.png")}
          />
      ),
      headerRight: () => (
          <Button
          onPress={() => alert('This is a button!')}
          title = "Info"
          color = '#000'
          />
      ),
    };
  
    render() {
      return (
        <View style={styles.container}>
            <Header headerText="Hello" />
            <SwipeableQueue style={styles.list} data={listData} />
        </View>
      );
    }
  }
  
  class TutorScreen extends Component {
    static navigationOptions = {
      drawerLabel: 'Tutors',
      drawerIcon: (
        <Image
        style = {{ width: 24, height: 24 }}
        source={require("../assets/images/tutors.png")}
        />
    ),
    };
  
    render() {
      return (
        <View></View>
      );
    }
  }

  class HistoryScreen extends Component {
    static navigationOptions = {
      drawerLabel: 'History',
      drawerIcon: (
        <Image
        style = {{ width: 24, height: 24 }}
        source={require("../assets/images/history.png")}
        />
    ),
    };
  
    render() {
      return (
        <View></View>
      );
    }
  }

  const DrawerContent = (props) => (
    <View>
      <View
        style={{
          backgroundColor: 'blue',
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 30 }}>
          Header
        </Text>
      </View>
      <DrawerItems {...props} />
    </View>
  )
  
  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    list: {
      flex: 1,
      marginTop: 32,
    },
  };

  const DrawerNavigator = createDrawerNavigator({
    Queue: {
      screen: QueueScreen,
    },
    Tutors: {
      screen: TutorScreen,
    },
    History: {
        screen: HistoryScreen,
    },
    }, {
        contentComponent: DrawerContent,
    }
  );
  
  export default createAppContainer(DrawerNavigator);
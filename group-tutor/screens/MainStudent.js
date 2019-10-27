import React, { Component } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, Picker } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Header, Input } from '../components/common';
import TicketList from '../components/common/TicketList';
import firebase from 'firebase';
import '@firebase/firestore';

class QueueScreen extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: null,
    };

    render() {
      return (
        <View style={styles.container}>
            <Header />
            <TicketList />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 40 }}>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Request')}>
                    <Image
                    style = {{ width: 50, height: 50 }}
                    source={require("../assets/images/add.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
      );
    }
  }

  class RequestScreen extends Component {
      
    static navigationOptions = {
        title: 'Create New Request',
    };

    state = { location: '', topic: '', description: '' };

    sendRequest() {

        var db = firebase.firestore();

        db.collection("requests").add({
         course: "CSE 100",
         std_name: firebase.auth().currentUser.email,
         topic: this.state.topic,
         location: this.state.location,
         description: this.state.description,
        });
        

        this.props.navigation.goBack();
    }

      render() {
          return(
              <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingTop: 50, marginLeft: 20, marginRight: 20 }}>
                      <Text
                      style={{ fontSize: 20, fontWeight: '500' }}>Where are you?
                      </Text>
                  <TextInput
                    style={{ borderBottomWidth: 1, paddingTop: 30, fontSize: 16 }}
                    placeholder="CSE B230"
                    label=""
                    value={this.state.location}
                    onChangeText={location => this.setState({ location })}
                    />
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingTop: 50, marginLeft: 20, marginRight: 20 }}>
                      <Text
                      style={{ fontSize: 20, fontWeight: '500' }}>I need help with...
                      </Text>
                      <Picker
                      style={{ width: 200, paddingTop: 30 }} 
                      selectedValue={this.state.topic}
                      onValueChange={(top) => this.setState({topic: top})}>
                      <Picker.Item label="Getting Started" value="getting_started" /> 
                      <Picker.Item label="Specifications" value="specifications" />
                      <Picker.Item label="Algorithms" value="algorithms" />
                      <Picker.Item label="Syntax" value="syntax" />
                      <Picker.Item label="Implementation" value="implementation" />
                      <Picker.Item label="Testing" value="testing" />
                      </Picker>
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingTop: 50, marginLeft: 20, marginRight: 20 }}>
                      <Text
                      style={{ fontSize: 20, fontWeight: '500' }}>Description
                      </Text>
                      <TextInput
                    style={{ borderBottomWidth: 1, paddingTop: 30, fontSize: 16 }}
                    placeholder="My function hello_world is not working."
                    label=""
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                    />
                  </View>
                  <View style={{ alignItems: 'center', padding: 40, paddingTop: 100 }}>
                      <TouchableOpacity
                      style={{ borderRadius: 5, backgroundColor: 'black', borderColor: 'black' }}
                      onPress={this.sendRequest.bind(this)}
                      >
                          <Text style={{ fontSize: 20, fontWeight: '500', color: '#fff', padding: 15 }}>Submit Request</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          );
      }
  }
  
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

  const DrawerNavigator = createStackNavigator({
    Queue: {
      screen: QueueScreen,
    },
    Request: {
        screen: RequestScreen,
    },
});
  
  export default createAppContainer(DrawerNavigator);
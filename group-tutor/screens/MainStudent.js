import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, Picker } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
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
            <Header onPress={() => firebase.auth().signOut().then(this.props.navigation.navigate('Login'))}/>
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

        var db = firebase.firestore();

        db.collection('tickets').get()
        .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.data().topic);
            console.log(this.state.topic);
      if (doc.data().topic == this.state.topic) {
          var description = doc.data().description;
          db.collection('tickets').doc(description).set({ 
              description: doc.data().description,
              status: doc.data().status,
              students: doc.data().students + 1,
              topic: doc.data().topic,
              tutor: doc.data().tutor
            })
            throw EarlyExit;
      } else {
          db.collection('tickets').doc(this.state.description).set({
              description: this.state.description,
              status: "unresolved",
              students: 1,
              topic: this.state.topic,
              tutor: ""
          })
      }
    });
    })
    .catch((err) => {
    console.log('Error getting documents', err);
    });


        

    }

      render() {
          return(
            <View style={{flex: 1, paddingTop: 50}}>
              <ScrollView>
                  <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 25, marginLeft: 20, marginRight: 20 }}>
                      <Text
                      style={{ fontSize: 20, fontFamily: 'SFProSemi' }}>Where are you?
                      </Text>
                  <TextInput
                    style={{ borderBottomWidth: 1, fontSize: 16, paddingTop: 10, fontFamily: 'SFPro' }}
                    placeholder="CSE B230"
                    label=""
                    value={this.state.location}
                    onChangeText={location => this.setState({ location })}
                    />
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingTop: 25, marginLeft: 20, marginRight: 20 }}>
                      <Text
                      style={{ fontSize: 20, fontFamily: 'SFProSemi' }}>I need help with...
                      </Text>
                      <Picker
                      style={{ width: 200 }} 
                      selectedValue={this.state.topic}
                      onValueChange={(itemValue, itemIndex) => this.setState({ topic: itemValue })}>
                      <Picker.Item label="Getting Started" value="getting_started" /> 
                      <Picker.Item label="Specifications" value="specifications" />
                      <Picker.Item label="Algorithms" value="algorithms" />
                      <Picker.Item label="Syntax" value="syntax" />
                      <Picker.Item label="Implementation" value="implementation" />
                      <Picker.Item label="Testing" value="testing" />
                      </Picker>
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingTop: 25, marginLeft: 20, marginRight: 20 }}>
                      <Text
                      style={{ fontSize: 20, fontFamily: 'SFProSemi' }}>Description
                      </Text>
                      <TextInput
                    style={{ borderBottomWidth: 1, fontSize: 16, paddingTop: 10, fontFamily: 'SFPro' }}
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
                          <Text style={{ fontSize: 20, color: '#fff', padding: 15, fontFamily: 'SFProSemi' }}>Submit Request</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Queue')}
                      >
                          <Text style={{fontFamily: 'SFPro', color: 'blue'}}>Go Back</Text>
                      </TouchableOpacity>
                  </View>
              </ScrollView>
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

  const DrawerNavigator = createSwitchNavigator({
    Queue: {
      screen: QueueScreen,
    },
    Request: {
        screen: RequestScreen,
    },
});
  
  export default createAppContainer(DrawerNavigator);
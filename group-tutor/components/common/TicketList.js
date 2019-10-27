import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Ticket from './Ticket';
import firebase from 'firebase';
import '@firebase/firestore';

class TicketList extends Component {
    state = { tickets: [] };


    componentWillMount() {
        var db = firebase.firestore();

        db.collection('tickets').get()
        .then((snapshot) => {
        snapshot.forEach((doc) => {
      this.setState({ tickets: this.state.tickets.concat(doc.data()) })
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
    }

    renderTickets() {
        return this.state.tickets.map(ticket =>
            <Ticket key={ticket.topic} ticket={ticket} />
            );
    }

    render() {
        return (
            <ScrollView style={{ paddingTop: 20 }}>
                {this.renderTickets()}
            </ScrollView>
        );
    }
}

export default TicketList;
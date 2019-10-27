import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Ticket from './Ticket';

class TicketList extends Component {
    state = { tickets: [
        ticket_example = {
            status: 'resolved',
            topic: "Gary's Quiz",
            tutor: "",
            students: "4",
            timestamp: "timestamp1",
        },
        ticket_example = {
            status: "in_progress",
            topic: "Ata's Bullshit",
            tutor: "Johnathan",
            students: "1",
            timestamp: "timestamp2",
        },
        ticket_example = {
            status: "unresolved",
            topic: "So Many Segfaults",
            tutor: "",
            students: "3",
            timestamp: "timestamp3",
        },
    ] };

    renderTickets() {
        return this.state.tickets.map(ticket =>
            <Ticket key={ticket.timestamp} ticket={ticket} />
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
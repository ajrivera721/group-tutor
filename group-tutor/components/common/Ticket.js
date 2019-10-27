import React from 'react';
import { Text, View, Image } from 'react-native';
import QueueCard from './QueueCard';

const Ticket = ({ ticket }) => {
    const { status, topic, description, tutor, students, timestamp } = ticket;
    
    var img_resolved = require('../../assets/images/resolved.png');
    var img_unresolved = require('../../assets/images/unresolved.png');
    var img_in_progress = require('../../assets/images/in_progress.png');

    var images = {
        resolved: img_resolved,
        unresolved: img_unresolved,
        in_progress: img_in_progress,
    };

    var colors = {
        resolved: '#2ECC71',
        unresolved: '#F5F5F5',
        in_progress: '#FFEB3B',
    };

    var status_string = JSON.stringify(status);
    status_string = status_string.slice(1, -1);

    return (
        <QueueCard color={colors[status_string]}>
            <View style={styles.imageStyle}>
               <Image
               style={{ width: 30, height: 30 }}
               source={images[status_string]}
               />
            </View>
            <View style={styles.rightStyle}>
                <View>
                    <Text style={styles.topicTextStyle}>{description}</Text>
                </View>
                <View style={styles.bottomStyle}>
                    <View>
                        <Text style={{paddingRight: 10, fontFamily: 'SFProReg'}}>{tutor}</Text>
                    </View>
                    <View>
                        <Image
                        style={{ width: 20, height: 20 }}
                        source={require('../../assets/images/tutors.png')}
                        />
                    </View>
                </View>
                <View style={[styles.bottomStyle, {paddingBottom: 10}]}>
                    <View>
                        <Text style={{ paddingRight: 10, fontFamily: 'SFProReg' }}>{students}</Text>
                    </View>
                    <View>
                        <Image
                        style={{ width: 20, height: 20 }}
                        source={require('../../assets/images/people.png')}
                        />
                    </View>
                </View>
            </View>
        </QueueCard>
    )
}

const styles = {
    imageStyle: {
        paddingLeft: 10,
    },
    rightStyle: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingBottom: 10,
    },
    bottomStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 5,
    },
    topicTextStyle: {
        fontFamily: 'SFProSemi',
        fontSize: 20,
        paddingTop: 10,
    },
};

export default Ticket;
import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import { Header } from '.';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

class TestScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listType: 'FlatList',
            listViewData: Array(20)
                .fill('')
                .map((_, i) => ({ key: `${i}`, text: `item #${i}` })),
            sectionListData: Array(5)
                .fill('')
                .map((_, i) => ({
                    title: `title${i + 1}`,
                    data: [
                        ...Array(5)
                            .fill('')
                            .map((_, j) => ({
                                key: `${i}.${j}`,
                                text: `item #${j}`,
                            })),
                    ],
                })),
        };

        this.rowSwipeAnimatedValues = {};
        Array(20)
            .fill('')
            .forEach((_, i) => {
                this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
            });
    }

    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    deleteRow(rowMap, rowKey) {
        this.closeRow(rowMap, rowKey);
        const newData = [...this.state.listViewData];
        const prevIndex = this.state.listViewData.findIndex(
            item => item.key === rowKey
        );
        newData.splice(prevIndex, 1);
        this.setState({ listViewData: newData });
    }

    deleteSectionRow(rowMap, rowKey) {
        this.closeRow(rowMap, rowKey);
        const [section] = rowKey.split('.');
        const newData = [...this.state.sectionListData];
        const prevIndex = this.state.sectionListData[section].data.findIndex(
            item => item.key === rowKey
        );
        newData[section].data.splice(prevIndex, 1);
        this.setState({ sectionListData: newData });
    }

    onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    render() {
        return (
            <View style={styles.container}>


                {this.state.listType === 'FlatList' && (
                    <SwipeListView
                        data={this.state.listViewData}
                        renderItem={data => (
                            <TouchableHighlight
                                onPress={() => console.log('You touched me')}
                                style={styles.rowFront}
                                underlayColor={'rgb(250,255,123)'}
                            >
                                <View>
                                    <View style={styles.imageStyle}>
                                        <Image
                                            style={{ width: 30, height: 30 }}
                                            source="../../gill.jpg"
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View>
                                            <Text style={styles.topicTextStyle}>Ata's crying about PQs</Text>

                                        </View>
                                        <View>
                                            <Text style={styles.tutorTextStyle}>Tutor</Text>
                                        </View>
                                    </View>
                                        <View style={styles.bottomStyle}>
                                            <View>
                                                <Image
                                                    style={{ width: 50, height: 50 }}
                                                    source={require('../../gill.jpg')}
                                                />
                                            </View>
                                            <View>
                                                <Text style={{ paddingLeft: 300 }}>4</Text>
                                            </View>
                                        </View>
                                
                                </View>
                            </TouchableHighlight>
                        )}
                        renderHiddenItem={(data, rowMap) => (
                            <View style={styles.rowBack}>
                                <Text>Left</Text>
                                <TouchableOpacity
                                    style={[
                                        styles.backRightBtn,
                                        styles.backRightBtnLeft,
                                    ]}
                                    onPress={() =>
                                        this.closeRow(rowMap, data.item.key)
                                    }
                                >
                                    <Text style={styles.backTextWhite}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.backRightBtn,
                                        styles.backRightBtnRight,
                                    ]}
                                    onPress={() =>
                                        this.deleteRow(rowMap, data.item.key)
                                    }
                                >
                                    <Animated.View
                                        style={[
                                            styles.trash,
                                            {
                                                transform: [
                                                    {
                                                        scale: this.rowSwipeAnimatedValues[
                                                            data.item.key
                                                        ].interpolate({
                                                            inputRange: [
                                                                45,
                                                                90,
                                                            ],
                                                            outputRange: [0, 1],
                                                            extrapolate:
                                                                'clamp',
                                                        }),
                                                    },
                                                ],
                                            },
                                        ]}
                                    >
                                        <Image
                                            source={require('../../gill.jpg')}
                                            style={styles.trash}
                                        />
                                    </Animated.View>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onRowDidOpen={this.onRowDidOpen}
                        onSwipeValueChange={this.onSwipeValueChange}
                    />
                )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'rgb(255, 90, 90)',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 100,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'rgb(35, 242, 97)',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: Dimensions.get('window').width / 4,
    },
    trash: {
        height: 50,
        width: 50,
    },
    imageStyle: {
        paddingLeft: 10,
    },
    rightStyle: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    bottomStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },
    topicTextStyle: {
        fontSize: 20,
        justifyContent: 'flex-end',
        fontWeight: "500",
        paddingTop: 7,
        paddingBottom: 5,
        textAlign: 'right',
    },
    tutorTextStyle: {
        fontSize: 14,
        fontWeight: "250",
        paddingTop: 7,
        paddingBottom: 10,
        textAlign: 'right',
    },
});

export { TestScreen };
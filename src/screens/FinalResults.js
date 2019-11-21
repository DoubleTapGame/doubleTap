//FinalResults
//things still needing to do: same as scoreboard, but also
//route path from 'exit game' button to the homescreen
import React, { Component } from 'react';
// import fontFamily from '../../assets';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback,
} from 'react-native';

export default class Scoreboard extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Final Scores
                    </Text>
                </View>
                <View style={styles.listContainer}>
                    <View>
                        <View style={styles.listText}>
                            <FlatList
                                data={[
                                    {key: '1', color: 'crimson'},
                                    {key: '2', color: 'cornflowerblue'},
                                    {key: '3', color: 'mediumseagreen'},
                                    {key: '4', color: 'gold'},
                                    {key: '5', color: 'hotpink'},
                                    {key: '6', color: 'lightslategrey'},
                                ]}
                                renderItem={({item}) =>
                                <View style={styles.list}>
                                    <View style={styles.numberBox} backgroundColor = {item.color}>
                                        <Text style={styles.numberBoxText}>{item.key}</Text>
                                    </View>
                                    <Text>PlayerName</Text>
                                    <Text>00</Text>
                                </View>
                                }
                            />
                        </View>
                    </View>
                </View>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Exit Game</Text>
                  </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#6816D3',
    },
    headerContainer: {
        height: 100,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        // backgroundColor: 'green',
        
    },
    listContainer: {
        height: 500,
        width: 275,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,

    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 60,
        marginBottom: 60,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 50,
        fontFamily: 'Futura',
        // fontFamily: 'Bangers',
    },
    listText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontFamily: 'Futura',
        
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 15,
        paddingBottom: 50
    },
    item: {
        flex: 1,
        padding: 5,
        marginBottom: 2,
        fontSize: 26,
        borderBottomColor: '#000',
        borderBottomWidth: 2
    },
    numberBox: {
        height: 40,
        width: 40,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
    },
    numberBoxText: {
        fontSize: 30,
        textAlign: 'center',
    },
    buttonText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        color: 'black',
        fontSize: 25,

    }
})

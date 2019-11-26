//scoreboard
//things to do still: add timer for showing this screen in between games,
//add crown for #1 spot
//get player info to show in the list items (color, name, score)
import React, { Component } from 'react';
// import fontFamily from '../../assets';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
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
                        Scoreboard
                    </Text>
                </View>
                <View style={styles.listContainer}>
                    <View style={styles.listContent}>
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
                            <View style={styles.listItem}>
                                <View style={styles.numberBox} backgroundColor = {item.color}>
                                    <Text style={styles.numberBoxText}>{item.key}</Text>
                                </View>
                                <Text style={styles.playerNameText}>
                                    PlayerName
                                </Text>
                                <Text style={styles.playerScoreText}>
                                    00
                                </Text>
                            </View>
                            }
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.headerText}>
                        Button
                    </Text>
                </View>
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
        flex: 1,
        height: 100,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        // backgroundColor: 'green',
        
    },
    listContainer: {
        flex: 6,
        height: 500,
        width: '80%',
        marginBottom: 15,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'space-around'

    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 40,
        marginBottom: 10,
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
    listContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontFamily: 'Futura',
    },
    listItem: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    numberBox: {
        height: 60,
        width: 60,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center'
    },
    numberBoxText: {
        fontSize: 30,
        textAlign: 'center',
    },
    playerNameText: {
        fontSize: 24,
        marginRight: 60,
    },
    playerScoreText: {
        fontSize: 30
    },
    buttonText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        color: 'black',
        fontSize: 25,
    }
})

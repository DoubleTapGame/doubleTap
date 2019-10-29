//scoreboard
import React, { Component } from 'react';
// import fontFamily from '../../assets';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    List,
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
                        ScoreBoard
                    </Text>
                </View>
                <View style={styles.listContainer}>
                    <View>
                        <Text style={styles.listText}>
                            This is where the list will go!
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Future Button</Text>
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
        height: 100,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        // backgroundColor: 'green',
        
    },
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 500,
        width: 275,
        backgroundColor: 'white',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 60,
        marginBottom: 60,
        backgroundColor: 'white',
    },
    headerText: {
        color: 'white',
        fontSize: 50,
        fontFamily: 'Futura',
        // fontFamily: 'Bangers',
    },
    listText: {
        alignItems: 'center',
        color: 'black',
        fontFamily: 'Futura',
    },
    buttonText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        color: 'black',

    }
})

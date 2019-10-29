//scoreboard
import React, { Component } from 'react';
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
                    <View style={styles.listText}>
                        <Text>This is where the list will go!</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Text>Future Button</Text>
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
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: 'green',
        
    },
    listContainer: {
        // justifyContent: 'space-between',
        alignItems: 'center',
        height: 500,
        width: 250,
        backgroundColor: 'yellow',
    },
    buttonContainer: {
        // justifyContent: 'space-between',
        alignItems: 'center',
        width: 100,
        height: 50,
        marginBottom: 60,
        backgroundColor: 'pink',
    },
    headerText: {
        color: 'white',
        // fontFamily: 'Bangers',
    },
    listText: {

        alignItems: 'center',
        color: 'black',
    }

})

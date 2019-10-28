//scoreboard
import { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Scoreboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <h1>ScoreBoard</h1>
                </View>
                <View>
                    <Text>This is where the list will go</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#6816D3',
    }
})
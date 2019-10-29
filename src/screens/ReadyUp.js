import * as React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

class ReadyUp extends React.Component {
  
  static navigationOptions = {
    header: null,
  };
    
  render() {
      return (
        <View style={{flex: 1}}>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.props.navigation.navigate('GameSetup')}>
            <View style={styles.player2Field}>
              <Text style={styles.gameTitle}>Rapid Tap!</Text>
              <Text style={styles.playerName}>Player 2:{"\n"}Tap to ready up</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.props.navigation.navigate('GameSetup')}>
            <View style={styles.player1Field}>
              <Text style={styles.gameTitle}>Rapid Tap!</Text>
              <Text style={styles.playerName}>Player 1:{"\n"}Tap to ready up</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create ({
    player2Field: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'cornflowerblue',
      transform: [{ rotate: '180deg'}]
    },
    player1Field: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'crimson',
    },
    playerName: {
      flex: 2,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 32,
    },
    gameTitle: {
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 52,
    },
})
export default ReadyUp;
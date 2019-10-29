import * as React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

class ReadyUp extends React.Component {
  
  static navigationOptions = {
    header: null,
  };
   
  constructor(props) {
    super(props);
    this.state = { player1ready: false, player2ready: false};
  }

  toggleReadyStatus(number){
    if(number === 1){
      this.setState(prevState => {
        return { player1ready: !prevState.player1ready };
      });
    }
    else{
      this.setState(prevState => {
        return { player2ready: !prevState.player2ready };
      });
    }
  }

  showText(number){
    if(number === 1 && this.state.player1ready){
      return(
      <View>
        <Text>Ready!</Text>
      </View>
      )
    }
    if(number === 2 && this.state.player2ready){
      return(
      <View>
        <Text>Ready!</Text>
      </View>
      )
    }
    else{
      return(
        <View>
          <Text></Text>
        </View>
      )
    }
  }

  render() {
      return (
        <View style={{flex: 1}}>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.toggleReadyStatus(2)}>
            <View style={styles.player2Field}>
              <Text style={styles.gameTitle}>Rapid Tap!</Text>
              <Text style={styles.playerName}>Player 2:{"\n"}Tap to ready up</Text>
              {this.showText(2)}
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.toggleReadyStatus(1)}>
            <View style={styles.player1Field}>
              <Text style={styles.gameTitle}>Rapid Tap!</Text>
              <Text style={styles.playerName}>Player 1:{"\n"}Tap to ready up</Text>
              {this.showText(1)}
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
import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class RoundSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlayers: [],  
      numberOfTurns: 1
    };
  }

  componentDidMount(){
    this.setState({activePlayers: [
      {color: 'crimson', name: 'Player 1'},
      {color: 'cornflowerblue', name: 'Player 2'},
    ]})
  }

  updateRoundNumber(bool){
      //add 1
      if(bool && this.state.numberOfTurns < 3) {
          this.setState(prev => ({numberOfTurns: prev.numberOfTurns + 1}))
      }
      //subtract 1
      else if(!bool && this.state.numberOfTurns > 1) {
        this.setState(prev => ({numberOfTurns: prev.numberOfTurns - 1}))
      }
  }

  getRoundText(){
    if(this.state.numberOfTurns === 1){
      return "Once"
    }
    else if(this.state.numberOfTurns === 2){
      return "Twice"
    }
    else {
      return "Thrice"
    }
  }

  getRoundCountText(){
    const numberOfPlayers = this.state.activePlayers.length

    if(this.state.numberOfTurns === 1){
      return "( " + this.calculateRounds(numberOfPlayers, 1) + " rounds)"
    }
    else if(this.state.numberOfTurns === 2){
      return "( " + this.calculateRounds(numberOfPlayers, 2) + " rounds)"
    }
    else {
      return "( " + this.calculateRounds(numberOfPlayers, 3) + " rounds)"
    }
  }

  calculateRounds(num, multiplier){
    if(num > 1){
      const product = this.factorial(num)/this.factorial(num-2)
      return product*multiplier
    }
    else if (num===1){
      return 1*multiplier
    }
    else{
      return 0
    }
  }

  factorial(n){
    if(n===0){return 1}
    else if(n===1){return 1}
    else if(n===2){return 2}
    else if(n===3){return 6}
    else if(n===4){return 24}
    else if(n===5){return 120}
    else if(n===6){return 720}
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@activePlayers')
      console.log("loaded: " + value)
      if(value !== null) {
        // value previously stored
        this.setState({activePlayers: value})
      }
    } catch(e) {
      // error reading value
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => {this.updateRoundNumber(false)}}>
          <View style={styles.button}>
            <Text style={styles.text}>–</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.textBox}>
          <Text style={styles.text}>{this.getRoundText()}</Text>
          <Text style={styles.subText}>{this.getRoundCountText()}</Text>
        </View>
        <TouchableHighlight onPress={() => {this.updateRoundNumber(true)}}>
          <View style={styles.button}>
            <Text style={styles.text}>+</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 80,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'grey',
        borderColor: 'black',
        borderWidth: 4,
    },
    textBox: {
        height: 80,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'white',
        borderTopColor: 'black',
        borderTopWidth: 4,
        borderBottomColor: 'black',
        borderBottomWidth: 4,
    },
    text: {
        fontSize: 32,
        textAlign: 'center',
    },
    subText: {
        fontSize: 20,
        textAlign: 'center',
    },
});
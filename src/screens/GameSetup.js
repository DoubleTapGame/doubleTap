//GameSetup

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import PlayerList from '../components/GameSetup/PlayerList.js'
import RoundSelect from '../components/GameSetup/RoundSelect.js'
import AsyncStorage from '@react-native-community/async-storage'

class GameSetup extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      activePlayers: [],
      numberOfTurns: 1,
    };
    this.handler = this.handler.bind(this)
    this.setNumberOfTurns = this.setNumberOfTurns.bind(this)
  }
  
  componentDidMount(){
    this.setState({activePlayers: [
      {color: '#e83559', name: 'Player 1', score: 0},
      {color: 'cornflowerblue', name: 'Player 2', score: 0},
    ]})
  }

  handler(list) {
    this.setState({
      activePlayers: list
    })
  }

  setNumberOfTurns(num) {
    this.setState({
      numberOfTurns: num
    })
  }

  viewPlayButton(){
    if(this.state.activePlayers.length > 1){
      return(
        <Button title="Play!" color="purple"
          onPress={() => {
            this.props.navigation.navigate('ReadyUp', {
              turnOrder: this.generateGame(),
              activePlayers: this.state.activePlayers
            });
          }}
        />
      )
    }
    else{
      return(
        <Button title="Play!"color="purple"
            disabled={true}/>
      )
    }
  }

  generateGame(){
    let results = []
    for(i = 0; i < this.state.activePlayers.length-1; i++){
      for(j = i + 1; j < this.state.activePlayers.length; j++){
        results.push([i,j])
      }
    }
    let duplications = []
    for(i = 1; i < this.state.numberOfTurns; i++){
      duplications = duplications.concat(results)
    }
    results = results.concat(duplications)
    this.shuffle(results)
    
    return results
  }

  shuffle(array) { // from: https://javascript.info/task/shuffle
    for(m = array.length - 1; m > 0; m--) {
      let n = Math.floor(Math.random() * (m + 1));
      [array[m], array[n]] = [array[n], array[m]];
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headingBox}>
          <Text style={styles.heading1}>
            PLAYERS
          </Text>
        </View>
        <View style={styles.playerListBox}>
          <Text style={styles.heading2}>
            Choose names and colors
          </Text>
          <PlayerList
            activePlayers={this.state.activePlayers}
            handler={this.handler}
          />
        </View>
        <View style={styles.roundSelectBox}>
          <Text style={styles.heading2}>
            Everyone plays each other:
          </Text>
          <RoundSelect
            activePlayers={this.state.activePlayers}
            numberOfTurns={this.state.numberOfTurns}
            handler={this.setNumberOfTurns}
          />
        </View>
        <View style={styles.buttonBox}>
          {this.viewPlayButton()}
        </View>
      </View>
    );
  }
}

export default GameSetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'mintcream',
  },
  headingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 20,
    marginBottom: 5,
	},
	playerListBox: {
    flex: 5,
    backgroundColor: '#ffffff',
		marginHorizontal: 20,
  },
  roundSelectBox: {
    flex: 2,
    backgroundColor: '#ffffff',
    margin: 20,
    marginVertical: 0,
  },
  buttonBox: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    margin: 20,
  },
  heading1: {
    fontSize: 48,
    color: '#000000',
    textAlign: 'center',
    margin: 5,
	},
	heading2: {
    fontSize: 28,
    color: '#7e0fa6',
    textAlign: 'center',
  },
  heading3: {
    fontSize: 24,
    color: '#3d3d3d',
    textAlign: 'center',
    margin: 5,
  },
});
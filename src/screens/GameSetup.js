//GameSetup

import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import PlayerList from '../components/GameSetup/PlayerList.js'

class GameSetup extends Component {
    
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { name: ''};
  }
  
getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@name')
    if(value !== null) {
      return value
    }
  } catch(e) {
    // error reading value
  }
  return 
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
            Enter names below:
          </Text>
          <PlayerList/>
        </View>
        <View style={styles.roundSelectBox}>
          <Text style={styles.heading2}>
            Players will play each other:
          </Text>
          <Text style={styles.heading3}>
            Hello
          </Text>
        </View>
        <View style={styles.buttonBox}>
          <Button 
            title="update text"
            color="blue"
            onPress={() => this.getData().then(value => {
              this.setState(prevState => ({name: value}))
              console.log(this.state.name);
            })}
          />
          <Button 
            title="Play!"
            color="purple"
            onPress={() => this.props.navigation.navigate('ReadyUp')}
          />
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
    margin: 10,
  },
  heading3: {
    fontSize: 24,
    color: '#3d3d3d',
    textAlign: 'center',
    margin: 5,
  },
});
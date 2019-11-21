import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, Alert, Button, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


function * addPlayers() {
  while(true){
    yield {color: 'mediumseagreen', name: 'Player 3'};
    yield {color: 'gold', name: 'Player 4'};
    yield {color: 'hotpink', name: 'Player 5'};
    yield {color: 'lightslategrey', name: 'Player 6'};
    yield {color: 'crimson', name: 'Player 1'};
    yield {color: 'cornflowerblue', name: 'Player 2'};
  }
}

const generator = addPlayers()

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlayers: [],
      maxPlayers: false};
  }

  componentDidMount(){
    this.setState({activePlayers: [
      {color: 'crimson', name: 'Player 1'},
      {color: 'cornflowerblue', name: 'Player 2'},
    ]})
  }

  saveName = async () => {
    try {
      console.log(this.state.activePlayers)
      await AsyncStorage.setItem('@activePlayers', JSON.stringify(this.state.activePlayers))
    } catch (e) {
      // saving error
    }
  }

  onUpdateItem = (i, text) => {
    const list = this.state.activePlayers.map((item, j) => {
      if (j === i) {
        item.name = text
        return item
      } else {
        return item;
      }
    });
    return list
  };

  removePlayer = index => {
    console.log('remove player' + index)
    return this.state.activePlayers.filter((item, j) => index !== j);
  };

  getAddPlayersButton() {
    if(!this.state.maxPlayers){
      return (
        <Button
          title = 'Add player'
          onPress={() => {
            this.setState(prevState =>
              ({activePlayers: prevState.activePlayers.concat(generator.next().value)}));
            if(this.state.activePlayers.length === 5){
              this.setState(prevState => ({maxPlayers: true}))
            }
          }}
        />
      )
    }
    else{
      return null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.activePlayers}
          renderItem={({item, index}) =>
            <View style={styles.list}>
              <View style={styles.numberBox} backgroundColor = {item.color}>
                <Text style={styles.numberBoxText}>{index+1}</Text>
              </View>
              <TextInput
                style = {styles.item}
                onChangeText = {data => this.setState({
                  activePlayers: this.onUpdateItem(index, data)
                })}
                value = {this.state.activePlayers[index].name}
                onEndEditing = {this.saveName}
                >
              </TextInput>
              <TouchableHighlight onPress={() => {
                this.setState({activePlayers: this.removePlayer(index)})
                this.setState({maxPlayers: false})
              }
              }>
                <View style={styles.button}>
                  <Text style={styles.buttonText}> x </Text>
                </View>
              </TouchableHighlight>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.addButton}>
          {this.getAddPlayersButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      marginHorizontal: 10,
      alignContent: 'flex-start',
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
    },
    numberBoxText: {
      fontSize: 30,
      textAlign: 'center',
    },
    list: {
      flexDirection: 'row',
    },
    button: {
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: 'white',
      height: 40,
      width: 40,
    },
    buttonText: {
      fontSize: 36,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: 'red',
    },
    addButton: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
});
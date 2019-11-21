import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


function * addPlayers() {
  yield {key: '3', color: 'mediumseagreen', name: 'Player 3'};
  yield {key: '4', color: 'gold', name: 'Player 4'};
  yield {key: '5', color: 'hotpink', name: 'Player 5'};
  yield {key: '6', color: 'lightslategrey', name: 'Player 6'};
  return;
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
      {key: '1', color: 'crimson', name: 'Player 1'},
      {key: '2', color: 'cornflowerblue', name: 'Player 2'},
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

  getRemovePlayersButton() {
    if(this.state.activePlayers.length > 2){
      return (
        <Button
          title = 'Remove player'
          // onPress={() => {
          //   this.setState(prevState =>
          //     ({activePlayers: prevState.activePlayers.concat(generator.next().value)}));
          // }}
          color='red'
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
          renderItem={({item}) =>
            <View style={styles.list}>
              <View style={styles.numberBox} backgroundColor = {item.color}>
                <Text style={styles.numberBoxText}>{item.key}</Text>
              </View>
              <TextInput
                style = {styles.item}
                onChangeText = {data => this.setState({
                  activePlayers: this.onUpdateItem(item.key-1, data)
                })}
                value = {this.state.activePlayers[item.key-1].name}
                onEndEditing = {this.saveName}
                >
              </TextInput>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.buttons}>
          {this.getAddPlayersButton()}
          {this.getRemovePlayersButton()}
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
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
});
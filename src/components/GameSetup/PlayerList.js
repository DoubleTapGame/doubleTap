import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, Alert, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function * addPlayers() {
  while(true){
    yield {color: 'mediumseagreen', name: 'Player 3', score: 0};
    yield {color: 'gold', name: 'Player 4', score: 0};
    yield {color: 'hotpink', name: 'Player 5', score: 0};
    yield {color: 'lightslategrey', name: 'Player 6', score: 0};
    yield {color: '#e83559', name: 'Player 1', score: 0};
    yield {color: 'cornflowerblue', name: 'Player 2', score: 0};
  }
}
const generator = addPlayers()

function * changeColor() {
  while(true){
    yield 'mediumseagreen';
    yield 'gold';
    yield 'hotpink';
    yield 'lightslategrey';
    yield '#e83559';
    yield 'cornflowerblue';
  }
}
const colorGenerator = changeColor()

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPlayers: false};
  }

  saveNamesToLocal = async () => {
    try {
      await AsyncStorage.setItem('@activePlayers', JSON.stringify(this.props.activePlayers))
    } catch (e) {
      // saving error
    }
  }

  updateNames = (i, text) => {
    const list = this.props.activePlayers.map((item, j) => {
      if (j === i) {
        item.name = text
        if(text==="Howdy"){item.color='mediumpurple'}
        return item
      } else {
        return item;
      }
    });
    return list
  };

  changePlayerColor(index){
    const list = this.props.activePlayers.map((item, j) => {
      if (j === index) {
        item.color = colorGenerator.next().value
        return item
      } else {
        return item;
      }
    });
    return list
  }

  removePlayer = index => {
    console.log('remove player' + index)
    return this.props.activePlayers.filter((item, j) => index !== j);
  };

  showAddPlayersButton() {
    if(!this.state.maxPlayers){
      return (
        <Button
          title = 'Add player'
          onPress={() => {
            this.props.handler(this.props.activePlayers.concat(generator.next().value));
            if(this.props.activePlayers.length === 5){
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
          data={this.props.activePlayers}
          renderItem={({item, index}) =>
            <View style={styles.list}>
              <TouchableOpacity onPress={() => {
                this.props.handler(this.changePlayerColor(index))}
              }>
                <View style={styles.numberBox} backgroundColor = {item.color}>
                  <Text style={styles.numberBoxText}>{index+1}</Text>
                </View>
              </TouchableOpacity>
              <TextInput
                style = {styles.item}
                onChangeText = {data => this.props.handler(this.updateNames(index, data))}
                value = {this.props.activePlayers[index].name}
                onEndEditing = {this.saveNamesToLocal}
                >
              </TextInput>
              <TouchableOpacity onPress={() => {
                this.props.handler(this.removePlayer(index))
                this.setState({maxPlayers: false})
              }
              }>
                <View style={styles.button}>
                  <Text style={styles.buttonText}> x </Text>
                </View>
              </TouchableOpacity>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatList}
        />
        <View style={styles.addButtonContainer}>
          {this.showAddPlayersButton()}
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
    addButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    flatList: {
      flexGrow: 0
    }
});
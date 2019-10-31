import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput } from 'react-native';

export default class PlayerList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
              {key: '1', color: 'crimson'},
              {key: '2', color: 'cornflowerblue'},
              {key: '3', color: 'mediumseagreen'},
              {key: '4', color: 'gold'},
              {key: '5', color: 'hotpink'},
              {key: '6', color: 'lightslategrey'},
          ]}
          renderItem={({item}) =>
          <View style={styles.list}>
            <View style={styles.numberBox} backgroundColor = {item.color}>
              <Text style={styles.numberBoxText}>{item.key}</Text>
            </View>
            <TextInput
            style = {styles.item}
            placeholder = 'Enter name...'>
            </TextInput>
          </View>
          }
        />
      </View>
    );
  }
}
//{item.color}
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
    }
});
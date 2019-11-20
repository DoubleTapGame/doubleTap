import React, { Component, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, Alert, Button, SafeAreaView, SectionList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


var nameList=['Nida','Jordan'];

function Item({title}){
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}
export default class PlayerList extends Component {
  

  constructor(props) {
    
       super(props)
    
       this.state = {
         Holder: ''
       }
    
     }
  AddItemsToArray=()=>{

      //Adding Items To Array.
      nameList.push(this.state.Holder.toString() );

      // Showing the complete Array on Screen Using Alert.
      // Alert.alert(nameList[0,1].name);
      console.log(nameList.toString());

  }
  

  render() {
    
    return (
      

      <View>

      <SafeAreaView style={styles.container}>
      <SectionList
        sections={[this.state.nameList]}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item}/>}
        renderSectionHeader={({section: {title}})=> (
          
          <Text>{title}</Text>
        )}
            // <View style={styles.list}>
              /* <View style={styles.numberBox} backgroundColor = {'blue'}> */
                // <Text style={styles.numberBoxText}>{item.key}</Text>
              /* </View> */
              /* </View> */
        />
        </SafeAreaView>
        <TextInput 
          placeholder="Enter name here"
          onChangeText={TextinputValue => this.setState({Holder: TextinputValue})}
          style={{textAlign: 'center', marginBottom: 6, height: 45}}
          ></TextInput>
          <Button title="Click here to add a name to the List" onPress ={this.AddItemsToArray}/>
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
    MainContainer : {
      flex: 1,
      justifyContent: 'center',
      margin: 15
    }
});


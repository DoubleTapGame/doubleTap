import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

export default class Home extends Component {
  static navigationOptions ={
    header: null,
  };
  render() {
    return (
      <View style={styles.ViewContainer}>
        <Text style={styles.TextContainer}>Double{"\n"}Tap</Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('GameSetup')}>
              <View style={styles.ButtonBox}>
                <View>
                  <Text style={styles.CustomButton}>Play!</Text>
                </View>
              </View>
            </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    ViewContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#6816D3',
    },
    TextContainer:
    {
      color: 'white',
      marginBottom: 200,
      fontFamily: 'Bangers',
      fontSize: 120,
      textAlign:'center',
    },
    ButtonBox:
    {
      backgroundColor: 'white',
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 150,
      paddingLeft: 150,
      borderRadius: 5,
    },
    CustomButton: 
    {
      fontSize: 35,
      fontFamily: 'Bangers',
    }
    
   

  });

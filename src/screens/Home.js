import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback,
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.ViewContainer}>
        <Text style={styles.TextContainer}>Double Tap</Text>

          <View style={styles.ButtonBox}>
            <TouchableHighlight>
              <View style={styles.CustomButton}>
                <Text>Play!</Text>
              </View>
            </TouchableHighlight>
        </View>
          
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
      //fontFamily: Bangers,
    },
    ButtonBox:
    {
      backgroundColor: 'white',
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 80,
      paddingLeft: 80,
    }
    
   

  });

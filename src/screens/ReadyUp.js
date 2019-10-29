import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ReadyUp extends React.Component {
    render() {
      return (
        <>
        <View>
          <Text style={{justifyContent: 'center'}}>Ready Up Screen</Text>
        </View>
        <View style ={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}}>
            <Text style = {styles.textRotate}>Player 1</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'skyblue'}} >
            <Text>Player 2</Text>
          </View>
        </View>
        </>
      );
    }
}

const styles = StyleSheet.create ({
    textRotate:{
    transform: [{ rotate: '180deg'}],
    alignItems: 'center'
    }
})
export default ReadyUp;
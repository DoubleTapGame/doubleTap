// import React, { Component } from 'react';
// import { Text } from 'react-native';

// export default class OutputT extends Component {
//     render(){
//         return(
//             <Text>"what"</Text>
//         );
//     }
// }

import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput } from 'react-native';

export default class PlayerList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
              {key: '1.'},
              {key: '2.'},
              {key: '3.'},
              {key: '4.'},
              {key: '5.'},
              {key: '6.'},
          ]}
          renderItem={({item}) => <TextInput
            style = {styles.item}
            placeholder = {item.key}></TextInput>}
        />
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
        padding: 5,
        marginBottom: 2,
        fontSize: 26,
        height: 44,
        borderBottomColor: '#000',
        borderBottomWidth: 2 
    },
});
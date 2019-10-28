//GameSetup
import * as React from 'react';
import { Button, View, Text } from 'react-native';

class GameSetup extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Game Setup Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}
 
export default GameSetup;

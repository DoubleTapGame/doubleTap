import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, Alert, StyleSheet} from 'react-native';

export default class HelpModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  getBoxStyle(){
    let num = this.props.player
    if(num===1){
      return({
        flex: 1,
        backgroundColor: 'white',
        margin: 20,
        height: '85%'
      })
    }
    else{
      return({
        flex: 1,
        backgroundColor: 'white',
        margin: 20,
        height: '85%',
        transform: [{ rotate: '180deg'}]
      })
    }
  }
  render() {
    return (
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            style={this.getBoxStyle()}>
            <View>
              <Text>Hello World!</Text>
            </View>
          </TouchableOpacity>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <View style={styles.helpButton}>
            <Text style={styles.helpMark}>?</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 20,
        height: '85%'
    },
    helpButton: {
      backgroundColor: 'lightgrey',
      width: 50,
      height: 50,
      borderRadius: 25,
      borderColor: 'black',
      borderWidth: 3,
      marginTop: 10,
      justifyContent: 'center'
    },
    helpMark: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'black',
      alignSelf: 'center'
    }
})

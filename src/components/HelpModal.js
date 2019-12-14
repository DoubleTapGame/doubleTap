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

  getHelpTitle(){
    return 'Rapid Tap'
  }

  getHelpBody(){
    return 'Tap your half of the screen as fast as you can! The first player to 100 wins.'
  }

  render() {
    return (
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            style={this.getBoxStyle()}>
            <View>
              <Text style={styles.gameText}>
                Game 
              </Text>
              <Text style={styles.title}>
                {this.getHelpTitle()}
              </Text>
              <Text style={styles.body}>
                {this.getHelpBody()}
              </Text>
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
    },
    gameText: {
      fontSize: 30,
      fontFamily: 'Bangers',
      alignSelf: 'center',
      marginTop: 20
    },
    title: {
      fontSize: 50,
      fontFamily: 'Bangers',
      fontWeight: 'bold',
      alignSelf: 'center',
      marginVertical: 25,
    },
    body: {
      fontSize: 28,
      fontFamily: 'Roboto Slab',
      marginHorizontal: 20,
      alignSelf: 'center'
    },
})

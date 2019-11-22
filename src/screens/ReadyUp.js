import * as React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

class ReadyUp extends React.Component {
  
  static navigationOptions = {
    header: null,
  };
   
  constructor(props) {
    super(props);
    this.state = {
      matchup: this.props.navigation.getParam('turnOrder',[[0,1]]).pop(),
      timer: 2,
      width: '20%',
      player1ready: false,
      player2ready: false,
      readyUp: ""
    };
  }

  componentDidMount(){
    const intervalID = setInterval(() => {
        if(this.state.timer > 1){
          this.setState(prevState => {return { timer: prevState.timer - 1 };});
        }
        else if(this.state.timer === 1){
          this.setState({ width: "80%"})
          this.setState({ readyUp: "(Tap to ready up!)"})
          clearInterval(intervalID);
        }
      }, 1000);
  }

  getViewStyle(num){
    let players = this.props.navigation.getParam('activePlayers')
    if(num === 1){
      return {
        flex: 1,
        alignItems: 'center',
        backgroundColor: players[this.state.matchup[0]].color,
      }
    }
    else{
      return{
        flex: 1,
        alignItems: 'center',
        backgroundColor: players[this.state.matchup[1]].color,
        transform: [{ rotate: '180deg'}]
      }
    }
  }

  getPlayerName(num){
    let players = this.props.navigation.getParam('activePlayers')
    if(num === 1){ return players[this.state.matchup[0]].name }
    else{ return players[this.state.matchup[1]].name }
  }

  getGameName = () => {
    const textStyle = {
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 32,
      borderColor: 'black',
      borderBottomWidth: 2,
      width: this.state.width
    };
    if(this.state.width==="80%"){
      return <Text style={textStyle}>Rapid Tap!</Text>
    }
    else{
      return <Text style={textStyle}></Text>
    }
  }

  toggleReadyStatus(num){
    if(num === 1){
      this.setState(prevState => {
        return { player1ready: !prevState.player1ready };
      });
    }
    else{
      this.setState(prevState => {
        return { player2ready: !prevState.player2ready };
      });
    }
  }

  showText(number){
    if(number === 1 && this.state.player1ready){
      return(<View><Text>Ready!</Text></View>)
    }
    if(number === 2 && this.state.player2ready){
      return(<View><Text>Ready!</Text></View>)
    }
    else{
      return(<View/>)
    }
  }

  render() {
      return (
        <View style={{flex: 1}}>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.toggleReadyStatus(2)}>
            <View style={this.getViewStyle(2)}>
              {this.getGameName()}
              <Text style={styles.playerName}>{this.getPlayerName(2)}</Text>
              <Text style={styles.tapText}>{this.state.readyUp}</Text>
              {this.showText(2)}
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.toggleReadyStatus(1)}>
            <View style={this.getViewStyle(1)}>
              {this.getGameName()}
              <Text style={styles.playerName}>{this.getPlayerName(1)}</Text>
              <Text style={styles.tapText}>{this.state.readyUp}</Text>
              {this.showText(1)}
            </View>
          </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create ({
    playerName: {
      flex: 2,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 52,
    },
    tapText: {
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 20,
    }
})
export default ReadyUp;
import * as React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import HelpModal from '../components/HelpModal.js'

const GAMELIST = [
  'RapidTap',
  'QuickDraw',
]

const GAMETITLES = [
  'Rapid Tap',
  'Quick Draw',
]

class ReadyUp extends React.Component {
  
  static navigationOptions = {
    header: null,
  };
   
  constructor(props) {
    super(props);
    this.state = {
      game: 'RapidTap',
      matchup: [0,1],
      width: '20%',
      player1ready: false,
      player2ready: false,
    };
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  componentDidMount(){
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        console.log('willBlur', payload);
        this.setState({
          game: 'RapidTap',
          matchup: [0,1],
          width: '20%',
          player1ready: false,
          player2ready: false,
        });
      }
    );

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        console.debug('willFocus', payload);
        this.setState({matchup: this.props.navigation.getParam('turnOrder',[[0,1]]).pop()})
        this.setState({game: Math.floor(Math.random() * GAMELIST.length)})
        this.sleep(2000).then(() => {
          this.setState({ width: "80%"})
        })
      }
    );
  }

  componentDidUpdate(){
    if(this.state.player1ready && this.state.player2ready){
      this.props.navigation.navigate(GAMELIST[this.state.game], {
        activePlayers: this.props.navigation.getParam('activePlayers'),
        matchup: this.state.matchup,
        turnOrder: this.props.navigation.getParam('turnOrder'),
      })
    }
  }

  componentWillUnmount(){
    this.willBlurSubscription.remove();
    this.willFocusSubscription.remove();
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
      width: this.state.width,
      fontFamily: 'Bangers',
    };
    if(this.state.width==="80%"){
      let title = GAMETITLES[this.state.game]
      console.log("ope "+title)
      return (
        <Text style={textStyle}>{title}</Text>
      )
    }
    else{
      return <Text style={textStyle}></Text>
    }
  }

  toggleReadyStatus(num){
    if(num === 1 && this.state.width === "80%"){
      this.setState(prevState => ({player1ready: !prevState.player1ready }))
    }
    if(num === 2 && this.state.width === "80%"){
      this.setState(prevState => ({player2ready: !prevState.player2ready }))
    }
  }

  getHelpButton(num){
    if(this.state.width==="80%"){
      return <HelpModal player={num}/>
    }
  }

  getReadyText(num){
    if(this.state.width != "80%") {return ''}
    else if(num===1){
      if(this.state.player1ready){return 'Ready!'}
      else{return '(Tap to ready up!)'}
    }
    else{
      if(this.state.player2ready){return 'Ready!'}
      else{return '(Tap to ready up!)'}
    }
  }

  render() {
      return (
        <View style={{flex: 1}}>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.toggleReadyStatus(2)}>
            <View style={this.getViewStyle(2)}>
              {this.getGameName()}
              {this.getHelpButton(2)}
              <Text style={styles.playerName}>{this.getPlayerName(2)}</Text>
              <Text style={styles.readyText}>{this.getReadyText(2)}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.toggleReadyStatus(1)}>
            <View style={this.getViewStyle(1)}>
              {this.getGameName()}
              {this.getHelpButton(1)}
              <Text style={styles.playerName}>{this.getPlayerName(1)}</Text>
              <Text style={styles.readyText}>{this.getReadyText(1)}</Text>
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
      fontFamily: 'Roboto Slab',
    },
    readyText: {
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 30,
      fontFamily: 'Bangers',
    },
})
export default ReadyUp;
import * as React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { black } from 'ansi-colors';

function * nextText(){
  yield '';
  yield 'Ready...';
  yield '';
  yield 'Steady...';
  yield '';
  yield 'Go!';
}

class QuickDraw extends React.Component {

  static navigationOptions = {
    header: null,
  };
   
  constructor(props) {
    super(props);
    this.state = {
        timer: 5,
        percentage: '100%',
        gameStart: false,
        round: 0,
        helpText: '\nTap when you see\n"Go!"\n\nFirst to 2 wins',
        startTime: 0,
        player1time: 0,
        player2time: 0,
        player1score: 0,
        player2score: 0,
    };
  }

  componentDidMount(){
    const intervalID = setInterval(() => {
      this.setState(prevState => {
        return { timer: prevState.timer - 1 };
      });  
      if(this.state.timer > 0){
        this.setState(prevState => {
          return { percentage: Math.trunc((prevState.timer/5)*100) + "%"};
        });
      }
      else {
        clearInterval(intervalID);
        this.runSequence();
      }
    }, 1000);
  }

  componentDidUpdate(){
    let p1 = this.state.player1time
    let p2 = this.state.player2time
    if ((p1 === p2 && (p1 < 0)) && this.state.gameStart && this.state.startTime > 0){
      this.setState({gameStart: false})
      this.setState({helpText: 'No one wins...'})
      this.sleep(3000).then(() => {
        this.resetRound()
      })
    }
    else if( ((p1 < p2 && (p1 > 0)) || p2 < 0) && this.state.gameStart && this.state.startTime > 0){
      this.setState({gameStart: false})
      let players = this.props.navigation.getParam('activePlayers')
      let matchup = this.props.navigation.getParam('matchup')
      this.setState({helpText: players[matchup[0]].name+' wins!'})
      this.setState(prev => { return {player1score: prev.player1score + 1}})
      this.sleep(3000).then(() => {
        this.resetRound()
      })
    }
    else if( ((p2 < p1 && (p2 > 0)) || p1 < 0) && this.state.gameStart && this.state.startTime > 0){
      this.setState({gameStart: false})
      let players = this.props.navigation.getParam('activePlayers')
      let matchup = this.props.navigation.getParam('matchup')
      this.setState({helpText: players[matchup[1]].name+' wins!'})
      this.setState(prev => { return {player2score: prev.player2score + 1}})
      this.sleep(3000).then(() => {
        this.resetRound()
      })
    }
    else if ((p1 === p2 && (p1 > 0)) && this.state.gameStart && this.state.startTime > 0){
      this.setState({gameStart: false})
      this.setState({helpText: 'Tie!'})
      this.sleep(3000).then(() => {
        this.resetRound()
      })
    }
  }

  runSequence(){
    let random = Math.floor(Math.random() * 6000) + 9000

    const textGenerator = nextText()
    this.setState({helpText: textGenerator.next().value})
    this.setState({gameStart: true})
    for(i = 1; i <= 4; i++){
      this.sleep(i * 2000).then( () => {
        if(true){
          this.setState({helpText: textGenerator.next().value})
        }
        console.log('waiting... ')
      })
    }

    this.sleep(random).then( () => {
      if(true){
        this.setState({helpText: textGenerator.next().value})
      }
      let time = Date.now()
      console.log('go! '+time)
      this.setState({startTime: time})
    })
  }

  resetRound(){
    if(this.state.player1score === 2){
      console.log('player one wins')
      this.sleep(2000).then(() => {
        this.props.navigation.navigate('Scoreboard', {
          activePlayers: this.props.navigation.getParam('activePlayers'),
          turnOrder: this.props.navigation.getParam('turnOrder'),
          winner: this.props.navigation.getParam('matchup')[0]
        })
      })
    }
    else if(this.state.player2score === 2){
      console.log('player one wins')
      this.sleep(2000).then(() => {
        this.props.navigation.navigate('Scoreboard', {
          activePlayers: this.props.navigation.getParam('activePlayers'),
          turnOrder: this.props.navigation.getParam('turnOrder'),
          winner: this.props.navigation.getParam('matchup')[1]
        })
      })
    }
    else {
      this.setState({startTime: 0})
      this.setState({player1time: 0})
      this.setState({player2time: 0})
      this.runSequence()
    }
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  getProgress(){
    return (
      <View style={{backgroundColor: "black", width: this.state.percentage}}/>
    );
  }

  getTime(){
    if(this.state.timer > 0) {
      return(<Text style={{fontSize: 20, marginLeft: 10}}>{this.state.timer}</Text>);
    }
    else{ return(<View/>);}
  }

  playerTouch(num){
    if(this.state.gameStart && this.state.startTime === 0){
      console.log('too early')
      if(num===1){
        this.setState({player1time: -1})
      }
      else{
        this.setState({player2time: -1})
      }
    }
    else if(this.state.gameStart){
      let time = Date.now()
      console.log(time)
      if(num===1){
        this.setState({player1time: time})
      }
      else{
        this.setState({player2time: time})
      }
    }
  }

  getReactionTime(num, show){
    if(num===1){
      if(this.state.player1time > 0){
        return this.msToTime(this.state.player1time - this.state.startTime)
      }
      else if(this.state.player1time < 0 && !show){
        return "Too early!"
      }
      else if(show){
        return '0.00'
      }
      else{return ''}
    }
    else {
      if(this.state.player2time > 0){
        return this.msToTime(this.state.player2time - this.state.startTime)
      }
      else if(this.state.player2time < 0 && !show){
        return "Too early!"
      }
      else if(show){
        return '0.00'
      }
      else{return ''}
    }
  }

  msToTime(s) { //https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
  
    return secs + '.' + ms;
  }

  getScoreBubbles(num){
    if((num && this.state.player1score===0) || (!num && this.state.player2score===0)){
      return(
        <View style={{flexDirection: 'row'}}>
          <View style={styles.emptyBubble}/>
          <View style={styles.emptyBubble}/>
        </View>
      )
    }
    else if((num && this.state.player1score===1) || (!num && this.state.player2score===1)){
      return(
        <View style={{flexDirection: 'row'}}>
          <View style={styles.winBubble}/>
          <View style={styles.emptyBubble}/>
        </View>
      )
    }
    else if((num && this.state.player1score===2) || (!num && this.state.player2score===2)){
      return(
        <View style={{flexDirection: 'row'}}>
          <View style={styles.winBubble}/>
          <View style={styles.winBubble}/>
        </View>
      )
    }
  }

  getViewStyle(num){
    if(num === 1){
      return {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'bisque',
      }
    }
    else{
      return{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'bisque',
        transform: [{ rotate: '180deg'}]
      }
    }
  }

  getBoxStyle(num){
    let players = this.props.navigation.getParam('activePlayers')
    let matchup = this.props.navigation.getParam('matchup')

    if(num===1){ return ({
      flexDirection: 'row',
      width: '100%',
      height: 50,
      backgroundColor: players[matchup[0]].color,
      borderColor: 'black',
      borderTopWidth: 2,
      alignItems: 'center',
      justifyContent: 'space-between'
      })
    }
    else{ return ({
      flexDirection: 'row',
      width: '100%',
      height: 50,
      backgroundColor: players[matchup[1]].color,
      borderColor: 'black',
      borderTopWidth: 2,
      alignItems: 'center',
      justifyContent: 'space-between'
      })
    }
  }

  render() {
      return (
        <View style={{flex: 1}}>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.playerTouch(2)}>
            <View style={this.getViewStyle(2)}>
              <View style={this.getBoxStyle(2)}>
                <Text style={styles.infoText}>
                  {this.getReactionTime(2, true)}
                </Text>
                {this.getScoreBubbles(0)}
                <Text style={styles.infoText}>vs.</Text>
                {this.getScoreBubbles(1)}
                <Text style={styles.infoText}>
                  {this.getReactionTime(1, true)}
                </Text>
              </View>
              <Text style={styles.instructions}>{this.state.helpText}</Text>
              <Text style={styles.instructions}>{this.getReactionTime(2, false)}</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.progressBar}>
            {this.getProgress()}
            {this.getTime()}
          </View>

          <TouchableHighlight style={{flex: 1}} onPress={() => this.playerTouch(1)}>
            <View style={this.getViewStyle(1)}>
              <View style={this.getBoxStyle(1)}>
                <Text style={styles.infoText}>
                  {this.getReactionTime(1, true)}
                </Text>
                {this.getScoreBubbles(1)}
                <Text style={styles.infoText}>vs.</Text>
                {this.getScoreBubbles(0)}
                <Text style={styles.infoText}>
                  {this.getReactionTime(2, true)}
                </Text>
              </View>
              <Text style={styles.instructions}>{this.state.helpText}</Text>
              <Text style={styles.instructions}>{this.getReactionTime(1, false)}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create ({
    timer:{
      flex: 1,
      fontSize: 20,
    },
    progressBar: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: 'white',
      borderColor: '#000',
    },
    instructions: {
      textAlign: 'center',
      fontSize: 34,
      marginBottom: 50,
      paddingHorizontal: 25
    },
    infoText: {
      fontSize: 24,
      marginHorizontal: 10,
    },
    emptyBubble: {
      width: 15,
      height: 15,
      marginHorizontal: 5,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 7.5
    },
    winBubble: {
      width: 15,
      height: 15,
      marginHorizontal: 5,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 7.5,
      backgroundColor: 'black'
    }
})

export default QuickDraw;
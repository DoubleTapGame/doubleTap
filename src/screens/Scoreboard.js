//scoreboard
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableHighlight,
} from 'react-native';

function compareValues(a, b) {
    var keyA = a.score,
    keyB = b.score;
    
    return (keyA - keyB)*(-1);
}

export default class Scoreboard extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
          activePlayers: [],
        };
    }
      
    componentDidMount(){
        this.setState({activePlayers: 
            this.increaseScore(this.props.navigation.getParam('winner'))})   
    }

    increaseScore(index){
        let players = this.props.navigation.getParam('activePlayers')
        const list = players.map((item, j) => {
            if (j === index) {
              item.score = item.score + 1
              return item
            } else {
              return item;
            }
        });
        
        return list
    }

    getButton(){
      let order = this.props.navigation.getParam('turnOrder')
      console.log("orderLength: "+order.length)
      if(order.length > 0) {
        return(  
        <TouchableHighlight
            onPress={() =>{
              this.props.navigation.navigate('ReadyUp', {
                activePlayers: this.state.activePlayers,
                turnOrder: order,
              })
            }}
            style={{height: 120}}
          >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              Continue
            </Text>
          </View>
        </TouchableHighlight>
        )
      }
      else {
        return (
        <TouchableHighlight
            onPress={() =>{
              this.props.navigation.navigate('Home')
            }}
            style={{height: 120}}
          >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              End Game
            </Text>
          </View>
        </TouchableHighlight>
        )
      }
    }

    getPlace(data, num){
        let scores = []
        for(i = 0; i < data.length; i++){
            scores.push(data[i].score)
        }
        scores.filter((item, index) => scores.indexOf(item) == index)
        return scores.indexOf(num)+1
    }

    render() {
        const DATA = this.state.activePlayers.slice().sort(compareValues)
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Scoreboard
                    </Text>
                    <Text style={styles.subHeaderText}>
                        Rounds remaining: {this.props.navigation.getParam('turnOrder').length}
                    </Text>
                </View>
                <View style={styles.listContainer}>
                    <View style={styles.listContent}>
                        <FlatList
                            data={DATA}
                            renderItem={({item, index}) =>
                            <View style={styles.listItem}>
                                <View style={styles.numberBox} backgroundColor = {item.color}>
                                    <Text style={styles.numberBoxText}>{this.getPlace(DATA, item.score)}</Text>
                                </View>
                                <Text style={styles.playerNameText}>
                                    {item.name}
                                </Text>
                                <Text style={styles.playerScoreText}>
                                    {item.score}
                                </Text>
                            </View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.flatListStyle}
                        />
                    </View>
                </View>
                {this.getButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#6816D3',
    },
    headerContainer: {
        flex: 1,
        height: 100,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
        
    },
    listContainer: {
        flex: 6,
        width: '80%',
        marginBottom: 15,
        borderRadius: 10,

    },
    flatListStyle: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        flexGrow: 0,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
        height: 40,
        marginBottom: 25,
        backgroundColor: 'lightgrey',
        borderColor: 'white',
        borderWidth: 4,
        borderRadius: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 65,
        fontFamily: 'Futura',
        fontFamily: 'Bangers',
    },
    subHeaderText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Futura',
        fontFamily: 'Bangers',
    },
    listContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontFamily: 'Roboto Slab',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    numberBox: {
        height: 60,
        width: 60,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center'
    },
    numberBoxText: {
        fontSize: 30,
        textAlign: 'center',
    },
    playerNameText: {
        fontSize: 24,
        fontFamily: 'Roboto Slab',
        width: '62%'
    },
    playerScoreText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    buttonText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Bangers',
        color: 'black',
        fontSize: 40,
    }
})

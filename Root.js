import React, { Component } from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//import screens here
import HomeScreen from './src/screens/Home.js';
import GameSetupScreen from './src/screens/GameSetup.js';
import ScoreboardScreen from './src/screens/Scoreboard.js';
import ReadyUpScreen from './src/screens/ReadyUp.js';
import FinalResultsScreen from './src/screens/FinalResults.js';

//import game screens here
import RapidTapScreen from './src/screens/Games/RapidTap.js';
import QuickDrawScreen from './src/screens/Games/QuickDraw.js';

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        GameSetup: GameSetupScreen,
        Scoreboard: ScoreboardScreen,
        ReadyUp: ReadyUpScreen,
        FinalResults: FinalResultsScreen,

        RapidTap: RapidTapScreen,
        QuickDraw: QuickDrawScreen,
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(RootStack);

class Router extends Component {
    render() {
    return (
        <AppContainer />
    );
    }
}

export default Router;
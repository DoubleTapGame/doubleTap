import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

//import screens here
import HomeScreen from './src/screens/Home';
// import GameScreen from './src/screens/Game';

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        // Game: GameScreen
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
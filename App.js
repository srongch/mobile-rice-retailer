import React from 'react';
import { View, Text,Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Scanner from './Screens/Scanner.js';
import MainScreen from './Screens/MainScreen.js';
import Searching from './Screens/Searching.js';
import Purchase from './Screens/PurchaseHistory.js';
import EachTransaction from './Screens/EachTrasaction.js';
import ConfirmPayment from './Screens/ConfirmPayment.js';
import Printing from './Screens/Printing.js';
import PurchaseComfirm from './Screens/PurchaseConfirm.js'
import Login from './Screens/login.js'

const MainStack = createStackNavigator(
  {
    Scanner : Scanner,
    MainScreen : MainScreen,
    Searching : Searching,
    Purchase : Purchase,
    ConfirmPayment : ConfirmPayment,
    Printing : Printing,
    PurchaseComfirm : PurchaseComfirm,
    Login : Login
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    defaultNavigationOptions: {
      // header: null
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    EachTransaction: {
      screen: EachTransaction,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

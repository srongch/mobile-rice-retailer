import React, { Component } from 'react';
import { View,Text } from 'react-native';
import PinView from 'react-native-pin-view'
import Colors from '../constants/Colors';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
    this.state = {
        pin: "1234"
    }
  }
  onComplete(inputtedPin, clear) {
  if(inputtedPin!==this.state.pin){
  clear();
  }else{
  console.log("Pin is correct")
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'MainScreen' })],
});
this.props.navigation.dispatch(resetAction);
//   this.props.navigation.navigate('MainScreen')
  }
  }
  render() {
    return (
      <View style={ {
        flex           : 1,
        flexDirection : 'column',
        backgroundColor: '#ffff',
        justifyContent : 'center'
      } }>
       <View style={
        
            {alignContent : 'center',
            alignSelf :'center'
            }
        } >
       <Text style={
            {paddingBottom : 40,
             fontSize : 20,
             color : '#134E76'
            }
        }>Enter PIN to unlock</Text>
       </View>
        <PinView
        onComplete={this.onComplete}
        pinLength={this.state.pin.length}
        deleteText ={'DEL'}
        buttonTextColor = {'#ffff'}
        buttonBgColor = {'#53B4DF'}
        inputActiveBgColor = {'#134E76'}
        // pinLength={6} // You can also use like that.
        />
      </View>
    );
  }
}
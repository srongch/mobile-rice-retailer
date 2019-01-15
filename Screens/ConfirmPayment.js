import React, { Component } from 'react';
import DialogInput from 'react-native-dialog-input';
import { Text, View, StyleSheet, Platform, TouchableHighlight,Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Colors from '../constants/Colors.js';
import NavigationView from './Components/NavigationView.js';
import HistoryList from './Components/historyList.js';
import userData from '../Dataset/userPurchaseHistory.json';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import NumberFormat from 'react-number-format';
export default class Purchase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: userData.data,
      isDialogVisible: false
    };
  }

  _onPressItem = () => {
    console.log("Pressed row: ");
    this.props.navigation.goBack()
  };

  cancelPressed(isShow){
    // Are sure to Cancel and go back to home page?
    Alert.alert(
      'Comfirm',
      'Are sure to Cancel and go back to main page?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.cancelOkPressed()}
      ],
      { cancelable: false }
    )
  }

  cancelOkPressed(){
    this.props.navigation.popToTop()
  }

  donePressed(){
    this.props.navigation.navigate('Printing')
  }

  render() {
    console.log(this.state.data)
    return (
      <View style={styles.container}>
        <NavigationView text='Payment' type='back'  onPressItem={this._onPressItem}/>
        <View style={{paddingTop:100,paddingBottom : 50}}>
        <NumberFormat value={this.props.navigation.getParam('totalAmout', '3')} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.total}> Total : {value}</Text>} /> 
          <Text style={styles.total}>Recieving Payment <AnimatedEllipsis /></Text>
         
        </View>
        <View style={buttonStyle.typewrapper}>
          <TouchableHighlight onPress={() => { this.cancelPressed(true) }} underlayColor="white">
            <View style={buttonStyle.background}>
              <Text style={buttonStyle.text}>Cancel</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => { this.donePressed(true) }} underlayColor="white">
            <View style={buttonStyle.backgroundContrast}>
              <Text style={buttonStyle.textContrast}>Payment Recieved</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.gray_background
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 15
  },
  searchInput: {
    height: 45,
    padding: 14,
    marginRight: Platform.OS === 'ios' ? 7 : 10,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E9E7E7',
    borderRadius: 8,
    color: Colors.textcolor_normal,
  },
  resultwrapper: {
    flex: 1,
    flexDirection: "column"
  },
  productwrapper: {
    paddingTop: 10,
    marginTop: 15,
    marginBottom: 10,
    height: 45,
    backgroundColor: Colors.white_background
  },
  productmain: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: Colors.textcolor_normal
  },
  totalvalue: {
    fontSize: 16,
    fontWeight: 'normal',
    paddingLeft: 15,
    color: Colors.textcolor_normal
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: Colors.textcolor_normal,
    alignSelf : 'center'
  },
  toalwrapper: {
    backgroundColor: Colors.white_background,
    marginBottom: 20
  },
  typewrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonLine: {
    height: 1,
    backgroundColor: '#E9E7E7',
    alignSelf: 'flex-end',
    marginRight: 15,
    width: 100
  },
  buttonLinetop: {
    height: 5,
    backgroundColor: '#E9E7E7'
  }

});

const buttonStyle = StyleSheet.create({
  typewrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  background: {
    borderColor: "#D21300",
    borderWidth : 1,
    backgroundColor: "#ffff",
    marginRight: 30,
    borderRadius: 5
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#D21300'
  },

  backgroundContrast: {
    backgroundColor: "#1C7CA7",
    borderRadius: 5
  }
  ,
  textContrast: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.white_background
  }

});
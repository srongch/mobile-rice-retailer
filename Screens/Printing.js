import React, { Component } from 'react';
import DialogInput from 'react-native-dialog-input';
import { Text, View, StyleSheet, Platform, WebView,TouchableHighlight,Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Colors from '../constants/Colors.js';
import NavigationView from './Components/NavigationView.js';
import HistoryList from './Components/historyList.js';
import userData from '../Dataset/userPurchaseHistory.json';
import { NavigationActions, StackActions } from 'react-navigation';

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

  showDialog (){
    Alert.alert(
      'Comfirm',
      'Printing Complete. Press Done to go to main Page.',
      [
        
        {text: 'Done', onPress: () => {  
          const goToTab = NavigationActions.navigate({
            routeName: 'MainScreen',
            params: {
              isFinish:true
            }
        });
          const resetAction = StackActions.reset({
          index: 0,
          params: {isFinish:true},
          actions: [goToTab],
      });
      this.props.navigation.dispatch(resetAction);}},
      ],
      { cancelable: false }
    )
  }



  // cancelOkPressed(){
  //   this.props.navigation.popToTop()
  // }

  render() {
    console.log(this.state.data)
    return (
      <View style={styles.container}>
        <NavigationView text='Invoice' type='back' onPressItem={this._onPressItem}/>
          <WebView
            style={{ flex: 1, paddingTop : 10 }}
            source={require("../Dataset/invoice.html")}
          />
        <View style={buttonStyle.typewrapper}>
                  <TouchableHighlight onPress={()=>{{this.props.navigation.push('MainScreen',{
          isFinish:true,
        })}}} underlayColor="white">
                    <View style={buttonStyle.background}>
                      <Text style={buttonStyle.text}>Finish</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{this.showDialog()}} underlayColor="white">
                    <View style={buttonStyle.backgroundContrast}>
                      <Text style={buttonStyle.textContrast}>Print Invoice</Text>
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
    color: Colors.textcolor_normal
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
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  backgroundContrast: {
    backgroundColor: "#1C7CA7",
    marginRight: 30,
    borderRadius: 5
  },

  textContrast: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.white_background
  },

  background: {
    backgroundColor: "#fff",
    borderColor: "#1C7CA7",
    borderWidth: 1,
    borderRadius: 5,
    marginRight : 20
  }
  ,
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#1C7CA7"
  }

});

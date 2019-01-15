import React, { Component } from 'react';
import DialogInput from 'react-native-dialog-input';
import { Text, View, StyleSheet, Platform, Alert, TouchableHighlight } from 'react-native';
import Colors from '../constants/Colors.js';
import NavigationView from './Components/NavigationView.js';
import HistoryList from './Components/historyList.js';
import userData1 from '../Dataset/userPurchaseHistory.json';
import NumberFormat from 'react-number-format';

export default class Purchase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: '',
      isDialogVisible: false,
      total : '',
      paid : '',
      remain : '',
      name : '',
      amountPay : ''
    };
  }

  _onPressItem = () => {
    console.log("Pressed row: ");
    this.props.navigation.goBack()
  };

  userSelcted = (index) => {
    console.log('selected  : ' + index)
    var newArray = this.state.data.filter(data =>{
      console.log('id :' +data.id)
        return data.id == index
    });
    this.props.navigation.push('EachTransaction',{
      data: newArray[0],
    });
  }

  confirmPressed(isShow){
    this.props.navigation.navigate('ConfirmPayment', {
      totalAmout: this.state.amountPay
    })
  }

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

  componentWillUnmount() { 
    const blankState = {};
    Object.keys(this.state).forEach(stateKey => {
  blankState[stateKey] = undefined;
});
this.setState(blankState);
  }
  
  componentWillMount(){
    const { navigation } = this.props;

    const userId = navigation.getParam('userId', '0');
    let payingAmount = navigation.getParam('amount',0)
    this.setState({
      amountPay : payingAmount
    })
    console.log('from userid : '+ userId)
    console.log('paying amount :' + payingAmount)
    var newArray = userData1.data.filter(data =>{
      console.log('id :' +data.id)
        return data.id == userId
    });

    let newData = []
    newArray[0].history.forEach(function(data) {
      console.log('paying amount :' + payingAmount)
      if(payingAmount - data.total >= 0){
        data.payment = data.total
        data.remain = 0
      }else{
        data.payment = payingAmount
        data.remain = data.total - data.paid
      }
      payingAmount = payingAmount - data.total;
      // data.total = 100000000
      newData.push(data);
    });

    let total1 = 0;
    let paid1 = 0;
    let remain1 = 0;
    newData.forEach(function(element) {
      total1 = total1 + element.total;
      paid1 = paid1 + element.payment;
    });
    remain1 = total1 - paid1;
    console.log("new data" + newData);
    this.setState({
      data : newData,
      name : newArray[0].name
    })
    this.setState({
      total : total1,
      remain : remain1,
      paid : paid1
    })
    console.log("this is start" + this.state.paid)
  }


  render() {
    

    return (
      <View style={styles.container}>
        <NavigationView text='Confirm Payment' type='back' onPressItem={this._onPressItem}/>
        {this.state.isLoading === false ? null :
          <View style={styles.resultwrapper}>
            <View style={styles.productwrapper}>
              <Text style={styles.productmain}>PRODUCTS</Text>
            </View>
            <HistoryList list={this.state.data} onPressItem={this.userSelcted} isConfirm = {true} />
            <View style={styles.toalwrapper}>
              <View style={styles.buttonLinetop}></View>
              <View style={{ flexDirection: 'column' }}>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>Total</Text>
                  <NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.totalBlue}>{value}</Text>} /> 
                  {/* <Text style={styles.totalBlue}>{this.state.total}</Text> */}
                </View>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>Total Paying</Text>
                  <NumberFormat value={this.state.paid} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.totalGreen}>{"- "+value}</Text>} /> 
                  {/* <Text style={styles.total}>- {this.state.paid}</Text> */}
                </View>
                <View style={styles.buttonLine}></View>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>Remain</Text>
                  <NumberFormat value={this.state.remain} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.totalRed}>{value}</Text>} /> 
                  {/* <Text style={styles.totalRed}>{this.state.remain}</Text> */}
                </View>
                <View style={buttonStyle.typewrapper}>
                
                  <TouchableHighlight onPress={()=>{this.cancelPressed(true)}} underlayColor="white">
                    <View style={buttonStyle.background}>
                      <Text style={buttonStyle.text}>Cancel</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{this.confirmPressed(true)}} underlayColor="white">
                    <View style={buttonStyle.backgroundContrast}>
                      <Text style={buttonStyle.textContrast}>Confirm Payment</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>

          </View>
        }

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
  totalvalue :{
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: Colors.textcolor_normal
  },
  total : {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: Colors.textcolor_normal
  },
  totalRed : {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: '#D21300'
  },
  totalGreen :{
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: '#669177'
  },
  totalBlue : {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: '#134E76'
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
    alignSelf : 'flex-end',
    marginRight : 15,
    width : 100
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

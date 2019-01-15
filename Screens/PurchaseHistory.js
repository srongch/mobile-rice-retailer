import React, { Component } from 'react';
import DialogInput from 'react-native-dialog-input';
import { Text, View, StyleSheet, Platform, Alert, TouchableHighlight } from 'react-native';
import Colors from '../constants/Colors.js';
import NavigationView from './Components/NavigationView.js';
import HistoryList from './Components/historyList.js';
import userData2 from '../Dataset/userPurchaseHistory1.json';
import NumberFormat from 'react-number-format';

export default class PurchaseHistory extends Component {

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
      userid : ''
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

  showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }
  sendInput(inputText){
    console.log("sendInput (DialogInput#1): "+inputText);
    this.showDialog(false)
    this.props.navigation.push('PurchaseComfirm', {
      amount: inputText,
      userId : this.state.userid
    })
  }

  payAllPressed(isShow){
    this.props.navigation.push('PurchaseComfirm', {
      amount: this.state.remain,
      userId : this.state.userid
    })
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

    const userId = navigation.getParam('userId', '3');
    console.log('from userid : '+ userId)
    var newArray = userData2.data.filter(data =>{
      console.log('id :' +data.id)
        return data.id == userId
    });

    let total1 = 0;
    let paid1 = 0;
    let remain1 = 0;
    newArray[0].history.forEach(function(element) {
      total1 = total1 + element.total;
      paid1 = paid1 + element.payment;
      remain1 = remain1 + element.remain;
    });
    // console.log(total);
    this.setState({
      data : newArray[0].history,
      name : newArray[0].name,
      userid : userId
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
        <NavigationView text={this.state.name} type='back' onPressItem={this._onPressItem}/>
        {this.state.isLoading === false ? null :
          <View style={styles.resultwrapper}>
            <View style={styles.productwrapper}>
              <Text style={styles.productmain}>PRODUCTS</Text>
            </View>
            <HistoryList list={this.state.data} onPressItem={this.userSelcted} />
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
                  <Text style={styles.totalvalue}>Paid</Text>
                  <NumberFormat value={this.state.paid} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.total}>{"- "+value}</Text>} /> 
                  {/* <Text style={styles.total}>- {this.state.paid}</Text> */}
                </View>
                <View style={styles.buttonLine}></View>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>To Pay</Text>
                  <NumberFormat value={this.state.remain} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.totalRed}>{value}</Text>} /> 
                  {/* <Text style={styles.totalRed}>{this.state.remain}</Text> */}
                </View>
                <View style={buttonStyle.typewrapper}>
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"Enter Amount"}
                    message={"Please input amount that customer want to pay"}
                    hintInput ={"Enter amount"}
                    submitInput={ (inputText) => {this.sendInput(inputText)} }
                    closeDialog={ () => {this.showDialog(false)}}
                    textInputProps={{keyboardType:'numeric'}}
                    submitText = {"Done"} >
                 </DialogInput>
                  <TouchableHighlight onPress={()=>{this.payAllPressed(true)}} underlayColor="white">
                    <View style={buttonStyle.background}>
                      <Text style={buttonStyle.text}>Pay All</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{this.showDialog(true)}} underlayColor="white">
                    <View style={buttonStyle.backgroundContrast}>
                      <Text style={buttonStyle.textContrast}>Enter Amount</Text>
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
  backgroundContrast: {
    backgroundColor: "#1C7CA7",
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

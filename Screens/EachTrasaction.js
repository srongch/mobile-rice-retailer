import React, { Component } from 'react';
import DialogInput from 'react-native-dialog-input';
import { Text, View, StyleSheet, Platform, ScrollView } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Colors from '../constants/Colors.js';
import NavigationView from './Components/NavigationView.js';
import HistoryList from './Components/historyList.js';
import userData from '../Dataset/userPurchaseHistory.json';
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

  render() {
    console.log(this.state.data)
    const data = this.props.navigation.getParam('data', null);
    return (
      <View style={styles.container}>
        <NavigationView text='Detail' type='back'  onPressItem={this._onPressItem} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.resultwrapper}>
          <View style={styles.productwrapper}>
              <Text style={styles.productmain}>PRODUCTS</Text>
            </View>
            <View style={styles.toalwrapper}>
              <View style={{ flexDirection: 'column' }}>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>Date</Text>
                  <Text style={styles.total}>{data.date}</Text>
                </View>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>Type</Text>
                  <Text style={styles.total}>{data.tyle}</Text>
                </View>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>Quality</Text>
                  <Text style={styles.total}>{data.quanity}</Text>
                </View>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>Price</Text>
                  <NumberFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.total}>{value}</Text>} /> 
                  {/* <Text style={styles.total}>{data.price}</Text> */}
                </View>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>Total</Text>
                  <NumberFormat value={data.total} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.total}>{value}</Text>} /> 
                  {/* <Text style={styles.total}>{data.total}</Text> */}
                </View>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>Paid</Text>
                  <NumberFormat value={data.payment} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.total}>{value}</Text>} /> 
                  {/* <Text style={styles.total}>{"- "+ data.payment}</Text> */}
                </View>
                <View style={styles.buttonLine}></View>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>Remain</Text>
                  <NumberFormat value={data.remain} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.total}>{value}</Text>} /> 
                  {/* <Text style={styles.total}>{data.remain}</Text> */}
                </View>
              </View>
            </View>
            <View style={styles.productwrapper}>
              <Text style={styles.productmain}>PAYMENT HISTORY</Text>
            </View>
            <View style={styles.toalwrapper}>
              <View style={{ flexDirection: 'column' }}>
                <View style={styles.typewrapper}>
                  <Text style={styles.totalvalue}>There is no payment history.</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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


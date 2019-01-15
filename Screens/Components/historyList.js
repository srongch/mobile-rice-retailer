import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native'
import Colors from '../../constants/Colors';
import NumberFormat from 'react-number-format';

export default class SearchList extends Component {

  _renderItem = ({ item, index }) => {
    const { onPressItem } = this.props
    const {isConfirm} = this.props

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onPressItem(item.id)}
      >
        <View style={styles.cellmain}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'stretch',alignItems:"center" }}>
            <View style={styles.contentwrapper}>
              <View style={styles.typewrapper}>
                <Text  style={styles.totalvalue}>{item.tyle +" ("+item.quanity+"KG)"}</Text>
                <Text style={styles.total}>{item.date}</Text>
              </View>
              <View style={styles.buttonLine}></View>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignContent: 'stretch',paddingBottom :10 }}>
                <View style={{ flexDirection: "column",alignItems:"center" }}>
                  <Text style={styles.total}>TOTAL</Text>
                  <NumberFormat value={item.total} displayType={'text'} thousandSeparator={true} suffix={'R'} renderText={value => <Text style={styles.totalvalue}>{value}</Text>} /> 
                  {/* <Text style={styles.totalvalue}>
                  <NumberFormat value={item.total} displayType={'text'} thousandSeparator={true} suffix={'R'} renderText={value => <Text >{value}</Text>} /> 
                  </Text> */}
                </View>
                <View style={styles.buttonLineHori}></View>
                <View style={{ flexDirection: "column" ,alignItems:"center"}}>
                {isConfirm === true ? <Text style={styles.total}>PAYING</Text> : <Text style={styles.total}>PAID</Text>
                }
                 {isConfirm === true ? 
                          <NumberFormat value={item.payment} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.totalvalueGreen}>{value}</Text>
                  } />  : <NumberFormat value={item.payment} displayType={'text'} thousandSeparator={true} suffix={'R'} 
                  renderText={value => <Text style={styles.totalvalue}>{value}</Text>
                  } /> 
                }
                  
                </View>
              </View>
            </View>
            <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowimage} />
          </View>
        </View>

      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    console.log(this.props.list)
    return (
      <FlatList
        data={this.props.list}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'whitesmoke',
    paddingTop : 10,
    marginLeft : 15,
    marginRight : 15,
    
  },
  cellmain: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 0,
    paddingLeft: 15,
    paddingRight: 4,
    backgroundColor: Colors.white_background,
    borderRadius : 10
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10
  },
  name: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'normal',
    color: Colors.textcolor_normal
  },
  buttonLine: {
    height: 1,
    backgroundColor: '#E9E7E7'
  },
  contentwrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingRight : 15
  },
  typewrapper: {
    paddingTop: 5,
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  arrowimage: {
    width: 20,
    marginRight: 0
  },
  buttonLine: {
    height: 1,
    backgroundColor: '#E9E7E7'
  },
  buttonLineHori: {
    width: 1,
    backgroundColor: '#E9E7E7'
  },
  total :{
    fontSize: 15,
    fontWeight: 'normal',
    color: '#626F72',
    paddingBottom : 4
  },
  totalvalueGreen : {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#669177',
   
  },
  totalvalue : {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textcolor_normal
  }
})
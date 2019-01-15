import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet,FlatList,Image } from 'react-native'
import Colors from '../../constants/Colors';

export default class SearchList extends Component {

  _renderItem = ({item,index}) => {
    const {onPressItem} = this.props

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onPressItem(item.id)}
      >
      <View style={styles.cellmain}>
      <Image style={styles.profile} source={{ uri: item.image }} />
        <Text style = {styles.name}>{item.name}</Text>
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
    marginBottom: 5,
    padding: 15,
  },
  cellmain:{
    flexDirection :'row',
    justifyContent : 'flex-start',
    alignItems : 'center'
  },
  profile:{
    width:40,
    height:40,
    borderRadius:20,
    marginLeft:10
  },  
  name:{
    fontSize:16,
    marginLeft : 10,
    fontWeight:'normal',
    color : Colors.textcolor_norma
  },
  buttonLine :{
    height : 1 ,
    backgroundColor : '#E9E7E7'}
})
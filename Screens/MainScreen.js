// https://xd.adobe.com/view/5a07399c-0902-4362-ba68-622c3b89567b

import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { View, StyleSheet, Text, Image, Button, TouchableHighlight, TouchableOpacity, Alert, SectionList } from 'react-native';
import colors from '../constants/Colors.js'
import NavigationView from './Components/NavigationView.js'
import dateData from '../Dataset/listOfMonth.json';
import dateDataDone from '../Dataset/listOfMonthDone.json';
import Colors from '../constants/Colors.js';

class SearchButton extends Component {
  _onPress = () => {
    this.props.onPressItem();
  }
  _onPressSearch = () => {
    this.props.onPressItemSearch();
  }
  constructor(props) {
    super(props);
  }
  render() {
    console.log("dfg");
    return (
      <View style={buttonstyles.container}>

        <View style={buttonstyles.buttonWrapper}>
          <TouchableHighlight onPress={this._onPressSearch} underlayColor="white">
            <Image style={buttonstyles.buttonImage} source={require('../assets/images/magnifying-glass.png')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPress} underlayColor="white">
            <Image style={buttonstyles.buttonImage} source={require('../assets/images/qr-code-scan.png')} />
          </TouchableHighlight>
        </View>
      </View>

    );
  }
}
const buttonstyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_background
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  buttonImage: {
    width: 65,
    marginRight: 20,
    height: 65
  },
  buttonLine: {
    height: 1,
    backgroundColor: '#E9E7E7'
  },

});


class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: 'red' }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}


export default class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  _onPressItem = () => {
    console.log("Pressed row: ");
    this.props.navigation.navigate('Scanner')
  };

  _onPressItemSearch = () => {
    console.log("search");
    this.props.navigation.navigate('Searching')
  }

  rowPressed(index) {
    console.log("userid :" + index)
    this.props.navigation.navigate('Purchase', {
      userId: index,
    })
  }

  componentWillMount() {

  }

  render() {
    const isFinish = this.props.navigation.getParam('isFinish', false);
    let dataToUse = null;
    if (isFinish) {
      dataToUse = dateDataDone.data
    } else {
      dataToUse = dateData.data
    }
    return (
      <View style={styles.container}>
        <NavigationView text='Main Page' />
        <SearchButton text="search" onPressItem={this._onPressItem} onPressItemSearch={this._onPressItemSearch} />
        <Text style={styles.paymenttext} >PAYMENT DUE: </Text>
        <View style={secstyles.container}>
          <SectionList
            sections={dataToUse}
            renderSectionHeader={({ section }) => {
              return (
                <View style={secstyles.titleContainer}>
                  <View style={buttonstyles.buttonLine}></View>
                  <Text style={secstyles.title}>
                    {section.date}
                  </Text>

                </View>
              )
            }}
            renderItem={({ item }) => {
              return (
                <View style={secstyles.maincontainer}>
                  <View style={buttonstyles.buttonLine}></View>
                  <View style={secstyles.container1}>
                    <Image style={secstyles.image} source={{ uri: item.image }} />
                    <View style={secstyles.content}>
                      <View style={secstyles.contentHeader}>
                        <Text style={secstyles.name}>{item.name}</Text>
                        {/* isFinish */}
                        <NumberFormat value={item.owe} displayType={'text'} thousandSeparator={true} suffix={'R'} renderText={value => <Text style={secstyles.owe}>{value}</Text>} />
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => { this.rowPressed(item.id) }}>
                      <View style={secstyles.buttonWrapper1}>
                        <Text style={secstyles.buttonText1} >Pay</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                </View>
              )
            }} />
        </View>

      </View>

    );
  }
};

const secstyles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#F5F5F5',
    paddingTop: 0,
    paddingBottom: 10,
    flexDirection: "column"
  },
  title: {
    fontSize: 17,
    color: "#000000",
    marginLeft: 15,
    paddingTop: 10

  },
  maincontainer: {
    flexDirection: 'column',
    // alignItems: 'center'
  }
  ,
  container: {
    paddingVertical: 0,
    flexDirection: 'row',
    //  alignItems: 'flex-start',
    flexDirection: 'row',
    //  alignItems: 'center',
    flex: 1,
    //   backgroundColor : Colors.debug_color
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  content: {
    marginLeft: 16,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    //   marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 17,
    fontWeight: 'normal',
    paddingBottom: 8
  },
  owe: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonWrapper1: {
    backgroundColor: Colors.buttonColor_blue,
    paddingTop: 7,
    paddingBottom: 7,
    marginRight: 15,
    borderRadius: 5
  },
  buttonText1: {
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 15,
    marginRight: 15,
    color: '#fff'

  }

});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background
  },
  paymenttext: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingBottom: 5,
    paddingTop: 20
  }

});


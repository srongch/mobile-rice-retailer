import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Platform, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Colors from '../constants/Colors.js';
import NavigationView from './Components/NavigationView.js';
import SearchList from './Components/Searchlist.js';
import userData from '../Dataset/userlist.json';

export default class Scanner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isLoading: true,
      data: ''
    };
  }

  _onPressItem = () => {
    console.log("Pressed row: ");
    this.props.navigation.goBack()
  };

  searchFilterFunction = (text) => {
    this.setState({ searchString: text });
    if (text !== '') {
      this.searchUser(this.state.searchString);
    } else {
      this.setState({ isLoading: true });
    }
  };

  searchUser = (text) => {
    const newData = userData.users.filter(item => {
      const itemData = item.name.toUpperCase();
      console.log("itemdata" + itemData);
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log("newdata" + newData);

    this.setState({
      isLoading: false,
      data: newData
    });
  }

  _onSearchPressed = () => {

    if (this.state.searchString === '') {
      Alert.alert(
        'Alert',
        'Please input name to search.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
      return
    }

    this.searchUser(this.state.searchString);
  };

  userSelcted = (index) => {
    console.log('selected  : ' + index)
    this.props.navigation.navigate('Purchase',{
      userId: index,
    });
  }

  render() {
    console.log('logagain')
    return (
      <View style={styles.container}>
        <NavigationView text='Search' type='back' onPressItem={this._onPressItem} />
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChangeText={text => this.searchFilterFunction(text)}
            placeholder='Search by name' />
          <Button
            onPress={this._onSearchPressed}
            color='#1C7CA7'
            title='Search'
          />
        </View>
        {this.state.isLoading === true ? null :
          <View style={styles.resultwrapper}>
            <Text style={styles.paymenttext} >Result:
              <Text style={{ color: '#134E76' }}>
                   {"  " +this.state.data.length}
              </Text>
            </Text>
            <SearchList list={this.state.data} onPressItem={this.userSelcted} />
          </View>
        }

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_background
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
    flex: 1
  },
  paymenttext: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingBottom: 5,
    paddingTop: 20
  }

});

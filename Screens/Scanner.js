import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Colors from '../constants/Colors.js';
import NavigationView from './Components/NavigationView.js'

export default class Scanner extends Component {
  state = {
    hasCameraPermission: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    var sentence = data.data
    var split = sentence.split("|");
    console.log(split)
    if(split.length > 0 && split[0] === "riceshop"){
      this.props.navigation.navigate('Purchase',{
        userId: split[1],
      });
    }else{
      Alert.alert(
        'Alert',
        'This QR is not belong to the shop.',
        [
         
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  };

  _onPressItem = () => {
    console.log("Pressed row: ");
    this.props.navigation.goBack()
  };

  render() {
    return (
      <View style={styles1.container}>
        <NavigationView text='Scanning' type='back' onPressItem={this._onPressItem}/>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission not granted</Text> :
            <View style={styles1.scanner}>
             <Text style={styles1.scannertext}>Please scan customer QR code.</Text>
              <View style={styles1.scannercontainer}>
                <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={styles1.scannerfixedRatio}
                />
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_background
  },
  scanner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  scannercontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 50


  },
  scannerfixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
  scannertext: {
    fontSize: 16,
    fontWeight: 'normal',
    color: Colors.textcolor_normal,
    // position : 'absolute',
    marginTop : 100


  }


});

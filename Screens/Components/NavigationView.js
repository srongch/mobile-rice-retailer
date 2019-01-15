import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform, Image,TouchableHighlight } from 'react-native';
import Colors from '../../constants/Colors.js'
import { hide } from 'expo/build/launch/SplashScreen';

export default class NavigationView extends Component {
    constructor(props) {
        super(props)
    }

    _onPress = () => {
        this.props.onPressItem();
      }

    render() {

        if (this.props.type === 'back') {
            return (
                <View style={styles.wrapper}>
                    <View style={styles.statusBarTop}></View>
                    <TouchableHighlight onPress={this._onPress} underlayColor="white">
                    <View style={backStyle.container}>
                        <Image source={require('../../assets/images/back_button.png')} style={backStyle.backButton} />
                        <Text style={backStyle.title} >{this.props.text}</Text>
                        
                    </View>
                    </TouchableHighlight>
                    <View style={styles.buttonLine}></View>
                </View>
            )
         }
        else
            return (
                <View style={styles.wrapper}>
                    <View style={styles.statusBarTop}></View>
                    <View style={styles.container}>
                        <Image source={{ uri: 'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }} style={styles.profile_image} />
                        <Text style={styles.title} >{this.props.text}</Text>
                    </View>
                    <View style={styles.buttonLine}></View>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor : Colors.white_background
    },
    statusBarTop: {
        height: Platform.OS === 'ios' ? 40 : 20,
        // backgroundColor : Colors.debug_color
    },
    buttonLine: {
        height: 1,
        backgroundColor: '#E9E7E7'
    },

    container: {
        flexDirection: 'row',
        backgroundColor: Colors.white_background,
        height: Platform.OS === 'ios' ? 65 : 65,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20
    },
    statusBar: {
        height: 20
    },
    profile_image: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    title: {
        textAlignVertical: 'center',
        paddingLeft: 20,
        fontSize: 20,
        color: Colors.navititle,
        fontWeight: 'bold',

    }

});


const backStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        
        height: Platform.OS === 'ios' ? 65 : 65,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor = Colors.buttonColor_blue,
        // paddingLeft: 20
    },
    backButton: {
        width : 40,
        height : 40,
        position : 'absolute',
        zIndex: 2,
        margin : 5
        
    },
    title: {
        textAlignVertical: 'center',
        textAlign: 'center',
        flex : 1,
        // paddingLeft: 20,
        fontSize: 20,
        color: Colors.navititle,
        alignSelf: 'center',
        fontWeight: 'bold'

    }

});

// export default  class NavigationView  extends Component {
//     constructor(props) {
//       super(props);
//       this.state = { isShowingText: true };

//       // Toggle the state every second
//       setInterval(() => (
//         this.setState(previousState => (
//           { isShowingText: !previousState.isShowingText }
//         ))
//       ), 1000);
//     }

//     render() {
//       if (!this.state.isShowingText) {
//         return null;
//       }

//       return (
//         <Text>{this.props.text}</Text>
//       );
//     }
//   }
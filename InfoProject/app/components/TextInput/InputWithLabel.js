import React, { PropTypes, Component } from "react";
import { View, Text, TouchableOpacity, TextInput,StyleSheet } from "react-native";

class InputWithLabel extends Component {

  render() {
    const {text} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.border}/>
        <View style={styles.buttonContainer}/>
      </View>
    );
  }
}
const INPUT_HEIGHT = 48;
const BORDER_RADIUS = 7;
const styles = StyleSheet.create({

    container:{
        backgroundColor:'#FFFFFF',
        width: '95%',
        height: INPUT_HEIGHT,
        borderRadius: BORDER_RADIUS,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
        paddingHorizontal:5
    },
    buttonContainer:{
        width:'20%',
        height: INPUT_HEIGHT,
        backgroundColor:'#2E5266',
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:BORDER_RADIUS, 
        borderBottomLeftRadius:BORDER_RADIUS,
    },
    buttonText:{
        fontWeight:'400',
        fontSize:15,
        color:'#FFFFFF',
        paddingHorizontal:5,
        borderTopLeftRadius:BORDER_RADIUS
    },
    input:{
        backgroundColor:'#FFFFFF',
        height:INPUT_HEIGHT,
        flex:1,
        fontWeight:'400',
        fontSize:15,
        paddingHorizontal:5,
        color:'#2E5266',
    },
    border:{
        height:INPUT_HEIGHT,
        width:StyleSheet.hairlineWidth,
        backgroundColor:'#FEFEFE',
    },
});
export default InputWithLabel;

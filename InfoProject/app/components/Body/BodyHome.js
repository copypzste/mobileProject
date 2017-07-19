import React, { PropTypes, Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  AsyncStorage,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from "react-native";

import { List,ListItem } from 'react-native-elements';

class BodyHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:"",
    };
  }
  static propTypes = {
    navigation: PropTypes.object
  };

  render() {
    let {onBodyPress , onEditPress} = this.props;
    let dataFromHome = this.props.data.map(function(homeData, index) {
      return (
        <View style={{marginBottom:5,
        backgroundColor:'white',
        paddingHorizontal:10,
        width:"100%"}}>
          <View style={{justifyContent:'space-between',flexDirection:'row'}}>
          <View style={{flexDirection:'row'}}>
          <Image 
          style={{height:40,width:40,marginTop:5,marginRight:10}}
          resizeMode='center'
          source={require('../images/businessman.png')}/>
          <Text style={{fontSize:16,fontWeight:'400' ,color:'black'}} >{homeData.salutationtype}   {homeData.firstname}   {homeData.lastname}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
         <TouchableOpacity 
          onPress={()=> onBodyPress(homeData.id)}
          style={styles.button}>
          <Image 
          style={{width:30}}
          resizeMode='center'
          source={require('../images/delete.png')}/>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=> onEditPress(homeData.firstname,homeData.lastname,homeData.email,homeData.mobile)}
          style={styles.button}>
          <Image
          style={{width:30}}
          resizeMode='center' 
          source={require('../images/pencil-striped-symbol-for-interface-edit-buttons.png')}/>
        </TouchableOpacity>
          </View>

          </View>
          <Text> {homeData.email} </Text>
        </View>
      );
    });
    return (
      <View >
        {dataFromHome}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width:30,
    height: 30,
    backgroundColor: "#2E5266",
    justifyContent: "center",
    marginTop:5,
    borderRadius:10,
    marginLeft:5,
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFFFF",
    alignSelf: "center"
  }
})
export default BodyHome;

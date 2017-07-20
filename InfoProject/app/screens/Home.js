import React ,{PropTypes} from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  FlatList,
  ScrollView,
  Image
} from "react-native";
import BodyHome from '../components/Body/BodyHome';
import Register from './Registers';
import ConfirmDelete from './ConfirmDelete';
import EditFrom from './EditFrom';
import { List,ListItem } from 'react-native-elements';

class Home extends React.Component {
   static propsType = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      session: "",
      dataJSON: [],
      userID:"",
      userIDEdit:"",
      firstName:"",
      lastName:"",
      email:"",
      mobile:"",
    };
    this.handleBodyHomePress = this.handleBodyHomePress.bind(this);
    this.handleEditPress = this.handleEditPress.bind(this);
  }
  
  componentDidMount() {
    this._loadInitialState().done();
  }

  // _keyExtractor = (item, index) => item.id;

  _loadInitialState = async () => {
    let valueName = await AsyncStorage.getItem('username');
    let valueSession = await AsyncStorage.getItem('session');
    if (valueName !== null) {
      this.setState({ username: valueName });
      this.setState({ session: valueSession });
    }
    console.log(this.state.username + "$$$");
    console.log(this.state.session + "$$$");
    // Start Fetch Data Here.
    this._loadDataFromAPI().done();
  };

  onCreatePress = () =>{
      console.log("From onCreatePress");
      this.props.navigation.navigate('Register');
  };

  _loadDataFromAPI = () => {
    console.log("From LoadData" + this.state.session);
    return fetch(
      "http://192.168.1.107/vtigercrm/webservice.php?operation=query&query=select+*+from+Contacts;&sessionName="+this.state.session
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({dataJSON : responseJson.result});
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleBodyHomePress(id){
   this.state.userID = id;
   AsyncStorage.setItem('userid',this.state.userID);
   console.log("this id is "+this.state.userID);
   this.props.navigation.navigate('ConfirmDelete');
    
  };

  handleEditPress(idEdit,fname,lname,mail,phone){
   let { userIDEdit, firstName, lastName, email, mobile } = this.state;
   userIDEdit = idEdit;
   firstName = fname;
   lastName = lname;
   email = mail;
   mobile = phone;
   console.log(idEdit+" ### "+fname+" ### "+lname+" ### "+mail+" ### "+phone);
   console.log(userIDEdit+" ### "+firstName+" ### "+lastName+" ### "+email+" ### "+mobile);
   AsyncStorage.setItem('useridEdit',userIDEdit);
   AsyncStorage.setItem('firstnameEdit',firstName);
   AsyncStorage.setItem('lastnameEdit',lastName);
   AsyncStorage.setItem('emailEdit',email);
   AsyncStorage.setItem('mobileEdit',mobile);


   this.props.navigation.navigate('EditFrom');
  };

  render() {
    return (
      <View>
        <ScrollView>
        <Text style = {{alignSelf:'flex-end',fontSize:20,marginBottom:30,
        marginRight:10}}>
          Welcome : {this.state.username}
        </Text>
        <BodyHome data = {this.state.dataJSON} 
        onBodyPress={this.handleBodyHomePress}
        onEditPress={this.handleEditPress}/>

        <TouchableOpacity 
        onPress={this.onCreatePress}
        style={styles.button}>
          <Image
          style={{width:40}}
          resizeMode = 'contain' 
          source ={require('../components/images/add-user-button.png')}/>
        </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width:50,
    height: 50,
    backgroundColor: "#2E5266",
    justifyContent: "center",
    borderRadius:50,
    marginLeft:10,
    marginTop:5,
    position: "absolute",
    left:0,
    top:0,
    right:10,
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFFFF",
    alignSelf: "center"
  }
});
export default Home;

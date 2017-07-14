import React, { Component , PropTypes} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Home from './Home';
import Register from './Registers';

class Login extends Component {

  static propsTypes = {
    navigation: PropTypes.object,

  };
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      sessionName :"",
      checkBtnClick: false,
    };
  }

  // getToken = () =>{
  //   console.log("From GetToken");
  //    return fetch('http://192.168.1.105/vtigercrm/webservice.php?operation=getchallenge&username=admin')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //        alert(responseJson.result.token);
  //        console.log(responseJson.result.token);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  onLoginPressed = ()=> {
     let sessionName ='';
     console.log(sessionName+"####");
     let params ={
         operation:'ulogin',
         username: this.state.username,
         password: this.state.password,
     }
     let formData = new FormData();
     for(var k in params){
         formData.append(k,params[k]);
         console.log(k+" : "+params[k]);
     }
     fetch('http://192.168.1.127/vtigercrm/webservice.php', {
       method: 'POST',
       body: formData,
     })
       .then(response => response.json())
       .then(responseJson => {
        console.log(responseJson);
         if(responseJson.success){
         sessionName = responseJson.result.sessionName;
         this.props.navigation.navigate('Home');
         AsyncStorage.setItem('username',this.state.username);
         alert("Login Success");
        }else{
            alert("Login Fail Pleas Try Again");
        }
        this.state.sessionName = sessionName;
        AsyncStorage.setItem('session',this.state.sessionName);
        console.log(this.state.sessionName+"xxxx");
        console.log(formData);
       })
       .catch(error => {
         console.error(error);
       });  
  };
  onRegisterPress = ()=>{
    console.log("Press Register");
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={val => this.setState({ username: val })}
          style={styles.input}
          placeholder="Email"
        />
        <Text>
          {this.state.operation}
        </Text>
        <TextInput
          onChangeText={val => this.setState({ password: val })}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Text>
          {this.state.password}
        </Text>
        <TouchableOpacity 
        onPress={this.onLoginPressed}
        style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 10,
    paddingTop: 80
  },
  input: {
    alignSelf: "stretch",
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#48bbec"
  },
  button: {
    height: 50,
    backgroundColor: "#48BBEC",
    alignSelf: "stretch",
    marginTop: 10,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 22,
    color: "#FFFFFF",
    alignSelf: "center"
  }
});

export default Login;

import React, { PropTypes } from "react";
import { View, Text, TouchableOpacity, StyleSheet , TextInput, AsyncStorage} from "react-native";
import Home from './Home';

class Registers extends React.Component {
  static propsType = {
    navigation: PropTypes.object,
    jsonData:PropTypes.object,
  };
  constructor() {
    super();
    this.state = {
      username:"",
      firstName: "",
      lastName: "",
      emailUser: "",
      phoneNumber: "",
      session: "",
      dataJSON: [],
      assignID:"19x1",
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

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
    this._loadDataFromAPI();
  };

  _loadDataFromAPI = () => {
    console.log("Load Finish!!! At "+ this.state.session);
    // return fetch(
    //   "http://192.168.1.127/vtigercrm/webservice.php?operation=query&query=select+*+from+Contacts;&sessionName=" +
    //     this.state.session
    // )
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({dataJSON : responseJson.result});
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  onConfirmPress = () => {
    const { username,firstName, lastName, emailUser,phoneNumber, session,dataJSON ,assignID} = this.state;

    console.log("From onConfirmPress");
    console.log(
       firstName +
        " @@@@ " +
        lastName +
        " @@@@ " +
           emailUser +
        " @@@@ " +
      phoneNumber+
        " @@@@ " +
        session
    );
    // Start Create
    const paramsElement = {
        'firstname' : firstName,
        'lastname' : lastName,
        'email': emailUser,
        'mobile': phoneNumber,
        'assigned_user_id' : assignID,
    }

    // let formElement = new FormData();
    // for(var k in paramsElement){
    //      formElement.append(k,paramsElement[k]);
    //  }
    let paramsBody = {
        operation : 'create',
        sessionName : session,
        element : paramsElement,
        elementType : 'Contacts',
     }
    let formBody = new FormData();
    for(var k in paramsBody){
         formBody.append(k,paramsBody[k]);
     }
    console.log(paramsElement);
    console.log(formBody);
     fetch('http://192.168.1.127/vtigercrm/webservice.php', {
       method: 'POST',
       body: formBody,
     })
       .then(response => response.json())
       .then(responseJson => {
        console.log(responseJson);
         if(responseJson.success){
         alert("Create Success!!!");
        }else{
            alert("Error Can't Create");
        }
        console.log(formData);
       })
       .catch(error => {
         console.error(error);
       }); 
    // this.props.navigation.navigate('Home');
  };

  onCancelPress = () => {
    console.log("From onCancelPress");
    this.props.navigation.goBack(null);
  };

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.contentInput}>
            <TextInput placeholder="First Name" 
            onChangeText={val => this.setState({ firstName: val })} 
            underlineColorAndroid="#FFFFFF" 
            style={styles.input} 
            />
          </View>
          <View style={styles.contentInput}>
            <TextInput placeholder="Last Name" 
            onChangeText={val => this.setState({ lastName: val })} 
            underlineColorAndroid="#FFFFFF" 
            style={styles.input} 
            />
          </View>
          <View style={styles.contentInput}>
            <TextInput placeholder="E-mail" 
            onChangeText={val => this.setState({ emailUser: val })} 
            underlineColorAndroid="#FFFFFF" 
            style={styles.input} 
            />
          </View>
          <View style={styles.contentInput}>
            <TextInput placeholder="Phone Number" 
            onChangeText={val => this.setState({ phoneNumber: val })} 
            underlineColorAndroid="#FFFFFF" 
            style={styles.input} 
            />
          </View>
          <View style={styles.contentInput}>
            <TextInput editable={false} 
            placeholder="Assign to : admin" 
            underlineColorAndroid="#EDEDED" 
            style={styles.inputUnEdit} 
            />
          </View>

          <TouchableOpacity onPress={this.onConfirmPress} 
          style={styles.button}>
            <Text style={styles.buttonText}>CONFIRM</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onCancelPress} 
          style={styles.button}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          {/*<Text style={{textAlign}}>
            Hello {this.props.userSession}
          </Text>*/}
      </View>
      )}
}

const INPUT_HEIGHT = 48;
const BORDER_RADIUS = 7;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    padding: 10
  },
  contentInput: {
    flexDirection: "row"
  },
   button: {
    width: "85%",
    height: 50,
    backgroundColor: "#2E5266",
    marginTop: 10,
    justifyContent: "center",
    borderRadius: 10
  },
  buttonContainer: {
    width: "20%",
    height: INPUT_HEIGHT,
    backgroundColor: "#2E5266",
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS
  },
  buttonText: {
    fontSize: 22,
    color: "#FFFFFF",
    alignSelf: "center"
  },
  input: {
    alignSelf: "stretch",
    width: "95%",
    height: INPUT_HEIGHT,
    marginTop: 10,
    paddingHorizontal: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    color: "#2E5266",
    backgroundColor: "#FFFFFF",
    borderRadius: BORDER_RADIUS
  },
  inputUnEdit:{
    alignSelf: "stretch",
    width: "95%",
    height: INPUT_HEIGHT,
    marginTop: 10,
    paddingHorizontal: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    color: "#2E5266",
    backgroundColor: "#CDCDCD",
    borderRadius: BORDER_RADIUS
  },
  border: {
    height: INPUT_HEIGHT,
    width: StyleSheet.hairlineWidth,
    backgroundColor: "#FEFEFE"
  }
});
export default Registers;

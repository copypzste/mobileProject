 import React, {PropTypes,Component} from 'react';
 import { View, TextInput,TouchableOpacity,Text ,StyleSheet ,AsyncStorage} from 'react-native';
 import Home from './Home.js';

 class EditFrom extends Component {
   static propsType = { navigation: PropTypes.object };

   constructor() {
     super();
     this.state = { 
      assignID:"19x1", 
      userID: "", 
      session: "",
      firstName:"",
      lastName:"",
      email:"",
      mobile:"",
      firstNameEdited:"",
      lastNameEdited:"",
      emailEdited:"",
      mobileEdited:"",  
      };
   }

   componentDidMount() {
    this._loadInitialState().done();
  }

   _loadInitialState = async () => {
    let valueID = await AsyncStorage.getItem("useridEdit");
    let valueSession = await AsyncStorage.getItem("session");
    let valueFirstName = await AsyncStorage.getItem("firstnameEdit");
    let valueLastName = await AsyncStorage.getItem("lastnameEdit");
    let valueEmail = await AsyncStorage.getItem("emailEdit");
    let valueMobile = await AsyncStorage.getItem("mobileEdit");
    if (valueID !== null) {
      this.setState({ userID: valueID });
      this.setState({ session: valueSession });
      this.setState({ firstName : valueFirstName});
      this.setState({ lastName : valueLastName});
      this.setState({ email : valueEmail});
      this.setState({ mobile : valueMobile});
    }
  };

   onConfirmEditPress =  async () =>{
     let {userID, session, firstName, lastName, email, mobile, assignID,
     firstNameEdited, lastNameEdited, emailEdited, mobileEdited } = this.state;
     if(firstNameEdited === ""){
       console.log("set firstname finished !!");
       firstNameEdited = firstName;
     }
     if(lastNameEdited === ""){
       console.log("set lastname finished !!");
       lastNameEdited = lastName;
     }
     if(emailEdited === ""){
       console.log("set email finished !!");
       emailEdited = email;
     }
     if(mobileEdited === ""){
       console.log("set mobile finished !!");
       mobileEdited = mobile;
     }

      let paramsBody = {
        operation : 'update',
        sessionName : session,
        element : JSON.stringify({
        id : userID,
        firstname : firstNameEdited,
        lastname : lastNameEdited,
        email: emailEdited,
        mobile: mobileEdited,
        assigned_user_id : assignID,
        }),
     }

      let formBody = new FormData();
      for(var k in paramsBody){
          formBody.append(k,paramsBody[k]);
      }
      console.log(formBody);
      console.log(userID);
      fetch('http://192.168.1.107/vtigercrm/webservice.php', {
       method: 'POST',
       body: formBody,
     })
       .then(response => response.json())
       .then(responseJson => {
        console.log(responseJson);
         if(responseJson.success){
         alert("Update Success!!!");
         this.componentDidMount();
         this.props.navigation.navigate('Home');
        }else{
            alert("Error Can't Update");
        }
       })
       .catch(error => {
         console.error(error);
       }); 
   };

   onCancelPress = () => {
     this.props.navigation.goBack(null);
   };

   render() {
     let { firstName, lastName, email, mobile,} = this.state;
     return( 
          <View style={styles.container}>
         <View style={styles.contentInput}>
           <TextInput 
           defaultValue={firstName}  
           onChangeText={val => this.setState({ firstNameEdited: val })} 
           underlineColorAndroid="#FFFFFF" style={styles.input} />
         </View>
         <View style={styles.contentInput}>
           <TextInput
           defaultValue={lastName}  
           onChangeText={val => this.setState({ lastNameEdited: val })} 
           underlineColorAndroid="#FFFFFF" style={styles.input} />
         </View>
         <View style={styles.contentInput}>
           <TextInput
           defaultValue={email} 
           onChangeText={val => this.setState({ emailEdited: val })} 
           underlineColorAndroid="#FFFFFF" style={styles.input} />
         </View>
         <View style={styles.contentInput}>
           <TextInput  
           defaultValue={mobile}
           onChangeText={val => this.setState({ mobileEdited: val })} 
           underlineColorAndroid="#FFFFFF" style={styles.input} />
         </View>
         <View style={styles.contentInput}>
           <TextInput editable={false} placeholder="Assign to : admin" underlineColorAndroid="#EDEDED" style={styles.inputUnEdit} />
         </View>

         <TouchableOpacity onPress={this.onConfirmEditPress} style={styles.button}>
           <Text style={styles.buttonText}>UPDATE</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={this.onCancelPress} style={styles.button}>
           <Text style={styles.buttonText}>CANCEL</Text>
         </TouchableOpacity>
         <Text>{this.state.firstNameEdited} </Text>
         {/*<Text style={{textAlign}}>
            Hello {this.props.userSession}
          </Text>*/}
       </View>
     );
    }
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
export default EditFrom;

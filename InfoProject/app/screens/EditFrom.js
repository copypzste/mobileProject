 import React, {PropTypes,Component} from 'react';
 import { View, TextInput,TouchableOpacity,Text ,StyleSheet } from 'react-native';

 class EditFrom extends Component{
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
export default EditFrom;

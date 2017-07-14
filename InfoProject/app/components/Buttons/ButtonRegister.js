import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

class ButtonRegister extends React.Component {
  render() {
    return (
      <View>
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
export default ButtonRegister;

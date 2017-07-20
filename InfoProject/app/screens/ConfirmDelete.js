import React,{PropTypes, Component} from 'react';
import { View , Text , StyleSheet ,TouchableOpacity ,AsyncStorage} from 'react-native';
import Home from './Home';

class ConfirmDelete extends Component {
  static propsType = {
    navigation: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      id: "",
      session: "",
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    let valueID = await AsyncStorage.getItem("userid");
    let valueSession = await AsyncStorage.getItem("session");
    if (valueID !== null) {
      this.setState({ id: valueID });
      this.setState({ session: valueSession });
    }
  };

  onCancelPress = () => {
    this.props.navigation.goBack(null);
  };

  onConfirmDeletePress = () => {
    console.log("From Confirm Delete");
    console.log(this.state.id);
    let params = {
      operation: "delete",
      sessionName: this.state.session,
      id: this.state.id
    };
    let formData = new FormData();
    for (var k in params) {
      formData.append(k, params[k]);
      console.log(k + " : " + params[k]);
    }
    fetch("http://192.168.1.107/vtigercrm/webservice.php", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.success) {
          this.props.navigation.navigate("Home");
          alert("Delete Success");
        } else {
          alert("Delete Fail Pleas Try Again");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        <Text style={{ fontSize: 30 }}>You Sure To Delete This ?</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={this.onConfirmDeletePress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>CONFIRM</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onCancelPress} style={styles.button}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
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
    width: "40%",
    height: 50,
    backgroundColor: "#2E5266",
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "center",
    borderRadius: 10
  },
  buttonText: {
    fontSize: 22,
    color: "#FFFFFF",
    alignSelf: "center"
  },
});
export default ConfirmDelete;
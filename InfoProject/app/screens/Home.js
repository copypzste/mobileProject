import React ,{PropTypes} from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  FlatList
} from "react-native";
import BodyHome from '../components/Body/BodyHome';
import Register from './Registers';

class Home extends React.Component {
   static propsType = {
    navigation: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      username: "",
      session: "",
      dataJSON: []
    };
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
      "http://192.168.1.127/vtigercrm/webservice.php?operation=query&query=select+*+from+Contacts;&sessionName=" +
        this.state.session
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({dataJSON : responseJson.result});
        console.log(this.state.dataJSON);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // _renderItem = ({ item }) => {
  //   return (
  //     <Text >
  //       {item.salutationtype} {item.firstname}
  //     </Text>
  //   );
  // };

  render() {
    return (
      <View>
        <Text>
          Hello From Home and {this.state.username}
        </Text>
        <BodyHome data = {this.state.dataJSON}/>

        <TouchableOpacity 
        onPress={this.onCreatePress}
        style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width:50,
    height: 50,
    backgroundColor: "red",
    marginTop: 10,
    justifyContent: "center",
    borderRadius:50,
    marginLeft:10,
    alignSelf:"flex-end",
    position: "relative",
    top:300,
    right:10,
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFFFF",
    alignSelf: "center"
  }
});
export default Home;

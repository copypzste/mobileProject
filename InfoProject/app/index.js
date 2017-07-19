import React , {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Register from './screens/Registers';
import Home from './screens/Home';
import Login from './screens/Login';
import {Root} from './config/routes';

class Index extends Component {

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <Root/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F5FCFF',
    }
});

export default Index;
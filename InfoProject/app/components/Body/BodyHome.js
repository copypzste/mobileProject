import React, { PropTypes, Component } from "react";
import { View, Text, FlatList, StyleSheet ,AsyncStorage} from "react-native";

class BodyHome extends Component {
  
  render() {
    let dataFromHome = this.props.data.map(function(homeData, index) {
      return (
        <View>
          <Text>{homeData.salutationtype} {homeData.firstname}</Text>
        </View>
      );
    });
    return(
            <View style={{backgroundColor:'pink'}}>
                    {dataFromHome}          
            </View>
        );

  }
}

export default BodyHome;

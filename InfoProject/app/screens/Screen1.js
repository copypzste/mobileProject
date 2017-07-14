import React from 'react';
import { View , Text  } from 'react-native';

class Screen1 extends React.Component{
    render(){
        return(
            <View style = {{backgroundColor:'#000000',flex:1}}>
                <Text>
                    Screen1!!
                </Text>
            </View>
        );
    }
}

export default Screen1;
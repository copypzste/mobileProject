import React, { Component } from "react";
import Home from "../screens/Home";
import Register from "../screens/Registers";
import Login from "../screens/Login";
import ConfirmDelete from '../screens/ConfirmDelete';
import EditFrom from '../screens/EditFrom';
import { StackNavigator , TabNavigator } from "react-navigation";
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';

export const RegisterStack = StackNavigator({
  Register: {
    screen: Register,
    navigationOptions: () => ({
      headerTitle: "Create"
    }),
  Login: {
      screen: Login
    }
  },
});

export const EditStack = StackNavigator({
    Home : {
      screen: Home,
      navigationOptions: () => ({
      headerTitle: "Home"
    })
  },
  EditFrom : {
      screen: EditFrom,
  }
});

export const DeleteStack = StackNavigator({
    Home : {
      screen: Home,
      navigationOptions: () => ({
      headerTitle: "Home"
    })
  },
  ConfirmDelete : {
      screen: ConfirmDelete,
  }
   
});  

export const AddStack = StackNavigator({
   Home : {
      screen: Home,
      navigationOptions: () => ({
      headerTitle: "Home"
    })
  },
  Register: {
    screen: Register,
     navigationOptions: () => ({
      headerTitle: "Create"
    })
  },
});

export const LoginStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      headerTitle: "Home"
    })
  }
});

// export const Tabs = TabNavigator({
//   Login:{
//     screen:Login,
//     navigationOptions: {
//       tabBarLabel: ' Login',
//       tabBarVisible : false,
//     },
//   },
//    Screen1: {
//     screen: Screen1,
//     navigationOptions: {
//       tabBarLabel: ' Screen1',
//     },
//   },
//    Screen2: {
//     screen: Screen2,
//     navigationOptions: {
//       tabBarLabel: 'Screen2',
//     },
//   },
// });

export const Root = StackNavigator({
    Login: {
      screen: Login
    },
    Register:{
      screen: RegisterStack,  
    },
    // Tab :{screen : Tabs,},
    Home: {screen: LoginStack},
    Add: {screen: AddStack},
    Delete: {screen : DeleteStack},
    Edit :{screen : EditStack},
  },
  {
    headerMode: "none",
    tabBarPosition: 'bottom',
  },
);

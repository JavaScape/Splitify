import React from "react";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import Main from "../screens/Main";
import Signup from "../screens/Signup";
import MainTabScreen from "../screens/Main";
import CreateGroup from "../screens/CreateGroup";

const ContactsStack = createStackNavigator();

const ContactsStackScreen = () => (
  <ContactsStack.Navigator>
    <ContactsStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false, headerLeft: null, left: null, gesturesEnabled: false, }}
    />
    <ContactsStack.Screen
      name="Signup"
      component={Signup}
      options={{ headerShown: false, headerLeft: null, left: null, gesturesEnabled: false, }}
    />
    <ContactsStack.Screen
      name="Main"
      component={Main}
      options={{ headerShown: false, headerLeft: null, left: null, gesturesEnabled: false, }}
    />
  </ContactsStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <ContactsStackScreen />
  </NavigationContainer>
);

// dafsd

import React from "react";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CreateGroup from "../screens/CreateGroup";
import Group from "../screens/Group";
import GroupSpecific from "../screens/GroupSpecific";

const ContactsStack = createStackNavigator();

const ContactsStackScreen = () => (
  <ContactsStack.Navigator>
    <ContactsStack.Screen
      name="Group"
      component={Group}
      options={{
        headerShown: false,
        headerLeft: null,
      }}
    />
    <ContactsStack.Screen
      name="CreateGroup"
      component={CreateGroup}
      options={{ headerShown: true }}
    />
    <ContactsStack.Screen
      name="GroupSpecific"
      component={GroupSpecific}
      options={{ headerShown: false }}
    />
  </ContactsStack.Navigator>
);

export default () => <ContactsStackScreen />;

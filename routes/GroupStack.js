import React from "react";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CreateGroup from "../screens/CreateGroup";
import Group from "../screens/Group";

const ContactsStack = createStackNavigator();

const ContactsStackScreen = () => (
    <ContactsStack.Navigator>
        <ContactsStack.Screen
            name="Group"
            component={Group}
            options={{
                headerShown: true, headerLeft: null
            }}
        />
        <ContactsStack.Screen
            name="CreateGroup"
            component={CreateGroup}
            options={{ headerShown: true }}
        />
    </ContactsStack.Navigator>
);



export default () => (
    <ContactsStackScreen />
);
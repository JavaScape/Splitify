import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login'
import Main from '../screens/Main'
import Signup from '../screens/Signup'

const ContactsStack = createStackNavigator();

const ContactsStackScreen = () => (
    <ContactsStack.Navigator>

        <ContactsStack.Screen name="Login" component={Login}

            options={{ headerShown: false }}

        />
        <ContactsStack.Screen name="Signup" component={Signup}
            options={{ headerShown: false }}
        />
        <ContactsStack.Screen name="Main" component={Main}

        />


    </ContactsStack.Navigator>
);

export default () => (
    <NavigationContainer>
        <ContactsStackScreen />
    </NavigationContainer>
);

// dafsd
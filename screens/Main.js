import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { StyleSheet, View, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

import Profile from './Profile';
import Group from './Group';
import Finance from './Finance';

import GroupStack from '../routes/GroupStack';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#fff"
        shifting={true}
        style={{ backgroundColor: 'tomato' }}
    >
        <Tab.Screen
            name="Group"
            component={GroupStack}
            options={{
                tabBarLabel: 'Group',
                tabBarColor: '#009387',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account-group" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Finance"
            component={Finance}
            options={{
                tabBarLabel: 'Finance',
                tabBarColor: '#1f65ff',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="credit-card-clock-outline" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
                tabBarLabel: 'Profile',
                tabBarColor: '#d02860',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
})

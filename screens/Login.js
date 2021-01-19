import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button, Alert } from 'react-native';

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.logo}
                source={require('../Logo/splitify.png')}
            />
            <View style={[styles.box, {
                transform: [{ translateY: -20 }]
            }]}>
                <TextInput
                    placeholder="Your Email"
                />
                <TextInput
                    placeholder="Your Password"
                />

            </View>
            <Button
                title="Login"
                onPress={() => navigation.push('Main')}

            />
            <Button
                title="Signup"
                onPress={() => navigation.push('Signup')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo: {
        width: 350,
        height: 350,
    },
})

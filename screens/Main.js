import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function main() {
    return (
        <View style={StyleSheet.container}>
            <Text> Main Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
})

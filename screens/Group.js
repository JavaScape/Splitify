import React from 'react';


import { StyleSheet, View, Text } from 'react-native';

export default function Group() {
    return (
        <View style={styles.container}>
            <Text>Group</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
})

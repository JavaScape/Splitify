import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Group({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.push("CreateGroup")} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Create Group</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#ff8080",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 8,

    },
    appButtonText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        width: 120,
        textAlign: 'center', // <-- the magic
    },
})

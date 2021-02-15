import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
var width = Dimensions.get("window").width - 80; //full width
var height = Dimensions.get("window").height; //full height

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
        padding: 24,
        backgroundColor: "#ecf9f2",
        height: height
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

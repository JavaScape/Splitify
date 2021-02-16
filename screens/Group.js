import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
var width = Dimensions.get("window").width - 80; //full width
var height = Dimensions.get("window").height; //full height

export default function Group({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.outside}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.push("CreateGroup")} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Create Group</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    outside: {
        height: "100%",
        backgroundColor: "#ecf9f2",
    },
    container: {
        padding: 24,
        backgroundColor: "#ecf9f2",
        height: "auto"
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

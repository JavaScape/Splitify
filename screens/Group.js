import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { getAllGroups } from "../components/firebaseCommands";
import * as firebase from "firebase";

var width = Dimensions.get("window").width - 80; //full width
var height = Dimensions.get("window").height; //full height



export default function Group({ navigation }) {

    const currUser = firebase.auth().currentUser;
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function getGroup() {
            await getAllGroups(currUser.uid).then((res) => {
                setGroups(res);
            });
        }
        getGroup();
    }, []);


    return (
        <ScrollView contentContainerStyle={styles.outside}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.push("CreateGroup")} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Create Group</Text>
                </TouchableOpacity>


                {groups.map((item) => {
                    return (
                        <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 10 }]}>
                            <View style={[styles.appButtonContainer, { marginTop: 10 }]}>
                                <Text style={[styles.appButtonText]}> {item} </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                {
                    groups.length == 0 &&
                    <View style={[styles.appButtonContainer, { marginTop: 10 }]}>
                        <Text style={[styles.appButtonText]}>You are not apart of any groups. </Text>
                    </View>
                }
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
        width: "100%",
        textAlign: 'center', // <-- the magic
    },
})

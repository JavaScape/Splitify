import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { getAllGroups, getGroup } from "../components/firebaseCommands";
import * as firebase from "firebase";
import { useIsFocused, isFocused } from "@react-navigation/native";

var width = Dimensions.get("window").width - 80; //full width
var height = Dimensions.get("window").height; //full height



export default function Group({ navigation }) {

    console.log("how many times will this run when i go on the page?!");
    const isFocused = useIsFocused();

    const currUser = firebase.auth().currentUser;
    const [groupJson, setGroupJson] = useState([]);

    useEffect(() => {
        setGroupJson([]);
        console.log("THIS IS THE USE EFFECT PRINTING STATEMENT");
        getAllGroups(currUser.uid).then((res) => {
            console.log(res);
            res.forEach(element => {
                getGroup(element).then((returnVal) => {
                    setGroupJson((prev) => [...prev, returnVal])
                })
            });


        });



    }, [isFocused]);

    console.log("BEFORE")
    console.log(groupJson);
    console.log("AFTER")
    // console.log("BEFOREEEEEEEEEEEEEEEEEEEEEEEEEEE")
    // groups.map((item) => {
    //     getGroupName(item).then((res) => console.log(res));
    // })
    // console.log("AFTERRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")




    return (
        <ScrollView contentContainerStyle={styles.outside}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.push("CreateGroup")} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Create Group</Text>
                </TouchableOpacity>

                {groupJson.map((item, k) => {
                    return (
                        <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 10 }]} key={k}>
                            <View style={[styles.appButtonContainer, { marginTop: 10 }]}>
                                <Text style={[styles.appButtonText]}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                {
                    groupJson.length == 0 &&
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

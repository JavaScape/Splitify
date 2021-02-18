import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { getAllGroups, getGroup, getImage } from "../components/firebaseCommands";
import * as firebase from "firebase";
import { useIsFocused, isFocused } from "@react-navigation/native";
import { Avatar } from "react-native-elements";

var width = Dimensions.get("window").width - 80; //full width
var height = Dimensions.get("window").height; //full height



export default function Group({ navigation }) {

    const isFocused = useIsFocused();

    const currUser = firebase.auth().currentUser;
    const [groupJson, setGroupJson] = useState([]);
    const [profilePic, setProfilePic] = useState([]);



    useEffect(() => {
        setGroupJson([]);
        setProfilePic([]);

        getAllGroups(currUser.uid).then((res) => {
            console.log(res);
            res.forEach(element => {

                getGroup(element).then((returnVal) => {
                    getImage(element).then((pic) => {
                        returnVal["pic"] = pic;
                        console.log(returnVal);
                        setGroupJson((prev) => [...prev, returnVal])

                    })

                })

            });


        });



    }, [isFocused]);



    return (
        <ScrollView contentContainerStyle={styles.outside}>

            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.push("CreateGroup")} style={[styles.appButtonContainer, { backgroundColor: "#ff8080" }]}>
                    <Text style={styles.appButtonText}>Create group</Text>
                </TouchableOpacity>

                {groupJson.map((item, k) => {
                    return (

                        <TouchableOpacity style={[styles.appButtonContainer]} key={k}>
                            <View style={[{ width: '100%' }]}>
                                <View style={styles.card}>
                                    <View style={styles.wholeCard}>
                                        <Avatar
                                            size={75}
                                            rounded
                                            overlayContainerStyle={{ backgroundColor: "grey" }}
                                            source={
                                                item.pic && {
                                                    uri: item.pic,
                                                }
                                            }
                                            icon={
                                                {
                                                    name: "user",
                                                    color: "rgb(192,192,192)",
                                                    type: "font-awesome",
                                                }
                                            }
                                            activeOpacity={0.7}
                                        />
                                    </View>
                                    <Text style={[styles.appButtonText]}>
                                        {item.name}

                                    </Text>

                                </View>
                            </View>
                        </TouchableOpacity>

                    );
                })}
                {
                    groupJson.length == 0 &&
                    <View style={[styles.appButtonContainer]}>

                        <Text style={[styles.appButtonText, { padding: 15 }]}>Currently, You are not apart of any group. </Text>

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
        alignItems: 'center',
    },
    container: {
        height: "auto",
        width: "85%",
        marginTop: 10
    },
    appButtonContainer: {
        elevation: 24,
        backgroundColor: "#20C9A2",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
        marginTop: 15,

    },
    appButtonText: {
        fontSize: 13,
        color: "#ffffff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        width: "100%",
        textAlign: 'center', // <-- the magic
    },
    wholeCard: {
        paddingLeft: 25,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '100%'

    },
})

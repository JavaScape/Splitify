import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Dimensions } from "react-native";
import { useEffect } from "react";
import { Avatar } from "react-native-elements";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as database from "./../components/firebaseCommands";
import {
  nameExist,
  addGroup,
  findUserId,
  addFriendToGroup,
  // groupExist,
} from "../components/firebaseCommands";

import * as firebase from "firebase";
import "firebase/firestore";

import { not } from "react-native-reanimated";

var width = Dimensions.get("window").width - 80; //full width
var height = Dimensions.get("window").height; //full height

export default function CreateGroup({ navigation }) {
  const [profilePic, setprofilePic] = useState(null);
  const [friends, setFriends] = useState([]);

  const currUser = firebase.auth().currentUser;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
    });

    if (!result.cancelled) {
      // await database.uploadImage(result.uri, currUser.uid);
      setprofilePic(result.uri);
    }
  };

  useEffect(() => {
    setFriends([]);
  }, [navigation]);

  // const checkAndAddGroup = async (names, friends) => {
  //   const check = await groupExist(names, friends);
  //   if (check) {
  //   }
  // };

  const checkFriend = yup.object({
    friendName: yup
      .string()
      .required()
      .min(3)
      .test("Check if friend exist", "Friend Does Not Exist", (val) => {
        // console.log(nameExist(val));
        console.log("HERE!!!");
        return nameExist(val, "email", "users");
      })
      .test(
        "friend not already in list",
        "Friend Included in Group Already",
        (val) => {
          return friends.includes(val) === false;
        }
      ),
  });

  const checkGroup = yup.object({
    name: yup
      .string()
      .required()
      .test("Atleast 1 friend", "Group Requires Atleast One Friend", (val) => {
        return friends.length > 0;
      })
      .test("does the group exist?", "Group Name Exist", (val) => {
        // return groupExist(val);
        return true;
      }),
  });

  const submitHandler = async (name) => {
    const groupId = await addGroup(name, friends.concat(currUser.email));

    const newPic = await database.uploadImage(profilePic, groupId);

    console.log("Before: " + profilePic);
    setprofilePic(null);
    console.log("After: " + profilePic);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Avatar
          size={200}
          rounded
          overlayContainerStyle={{ backgroundColor: "grey" }}
          source={
            profilePic && {
              uri: profilePic,
            }
          }
          icon={
            !profilePic && {
              name: "user",
              color: "rgb(192,192,192)",
              type: "font-awesome",
            }
          }
          onPress={() => pickImage()}
          activeOpacity={0.7}
        />

        <Formik
          initialValues={{ name: "" }}
          validationSchema={checkGroup}
          onSubmit={(values, actions) => {
            // checkAndAddGroup(values.name, friends);
            submitHandler(values.name);
            // addGroup(values.name, friends.concat(currUser.email));

            setFriends([]);
            actions.resetForm();
          }}
        >
          {(props) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Group Name"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
              ></TextInput>
              <Text>{props.errors.name}</Text>

              <Formik
                initialValues={{ friendName: "" }}
                validationSchema={checkFriend}
                onSubmit={(values, actions) => {
                  setFriends((prevArray) => [...prevArray, values.friendName]);
                  actions.resetForm();
                }}
              >
                {(friendProps) => (
                  <View>
                    <View style={styles.friend}>
                      <TextInput
                        style={[styles.input, styles.small]}
                        placeholder="Friend Name"
                        onChangeText={friendProps.handleChange("friendName")}
                        value={friendProps.values.friendName}
                      ></TextInput>

                      <TouchableOpacity
                        onPress={friendProps.handleSubmit}
                        style={styles.appButtonContainer}
                      >
                        <Text style={styles.appButtonText}>Add</Text>
                      </TouchableOpacity>

                      {/* <Button title='Add' onPress={friendProps.handleSubmit} ></Button> */}
                    </View>
                    <Text>{friendProps.errors.friendName}</Text>
                    {friends.length == 0 && (
                      <View
                        style={[
                          styles.appButtonContainer,
                          { width: Dimensions.get("window").width - 70 },
                          { marginTop: 10 },
                        ]}
                      >
                        <Text style={styles.appButtonText}>
                          Required Atleast 1 Friend
                        </Text>
                      </View>
                    )}

                    {friends.map((item) => {
                      return (
                        <View
                          style={[
                            styles.appButtonContainer,
                            { backgroundColor: "#94b8b8" },
                            { width: Dimensions.get("window").width - 70 },
                            { marginTop: 10 },
                          ]}
                          key={item}
                        >
                          <Text style={styles.appButtonText}>{item}</Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </Formik>

              <TouchableOpacity
                onPress={props.handleSubmit}
                style={[
                  styles.appButtonContainer,
                  styles.normal1,
                  styles.normal2,
                ]}
              >
                <Text style={styles.appButtonText}>Create Group</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    width: Dimensions.get("window").width,
    backgroundColor: "#ecf9f2",
    height: height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderColor: "#a6a6a6",
    borderRadius: 10,
    borderWidth: 1,
    padding: 2,
    paddingLeft: 8,
    margin: 10,

    alignSelf: "center",
    width: Dimensions.get("window").width - 70,
  },
  friend: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  MainContainer: {
    flex: 1,
    margin: 10,
  },

  TextStyle: {
    fontSize: 10,
    textAlign: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#ff8080",
    borderRadius: 10,
    height: 35,
    width: 70,
    paddingVertical: 7,
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textAlign: "center", // <-- the magic
  },

  small: {
    width: Dimensions.get("window").width - 140,
  },
  normal1: {
    elevation: 8,
    backgroundColor: "#5c8a8a",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 25,
  },
  normal2: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    width: 150,
    textAlign: "center", // <-- the magic
  },
});

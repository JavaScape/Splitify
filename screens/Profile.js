import React, { useState, useContext } from "react";
import { Avatar } from "react-native-elements";
import { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

import * as firebase from "firebase";
import { UserContext } from "../components/userContext";

import * as database from "./../components/firebaseCommands";

import * as ImagePicker from "expo-image-picker";

export default function Profile({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [profilePic, setprofilePic] = useState(null);

  const currUser = firebase.auth().currentUser;
  useEffect(() => {
    async function getImageFromUser() {
      const result = await database.getImage(currUser.uid);
      setprofilePic(result);
    }
    getImageFromUser();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
    });

    if (!result.cancelled) {
      await database.uploadImage(result.uri, currUser.uid);
      setprofilePic(result.uri);
    }
  };

  function logoutUser() {
    // You need asyn
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(firebase.auth().currentUser);
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
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

      {user != null && <Text style={styles.text}>{user.data().email}</Text>}
      <Text style={styles.text}>{user != null && user.data().name}</Text>
      <View style={styles.sidebyside}>
        <TouchableOpacity
          onPress={() => logoutUser()}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logoutUser()}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 24,
    backgroundColor: "#ffe6e6",
  },
  text: {
    fontSize: 36,
    fontWeight: "200",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#ff8080",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    width: 100,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10, // <-- the magic
  },
  sidebyside: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
});

import React, { useContext } from "react";
import { Avatar } from "react-native-elements";
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

export default function Profile({ navigation }) {
  const { user, setUser } = useContext(UserContext);

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
        icon={{ name: "user", color: "rgb(192,192,192)", type: "font-awesome" }}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />

      {user != null && <Text style={styles.text}>{user.data().email}</Text>}
      <Text style={styles.text}>{user != null && user.data().name}</Text>

      <TouchableOpacity
        onPress={() => logoutUser()}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>logout</Text>
      </TouchableOpacity>
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
    backgroundColor: "rgba(240,128,128, 0.3)",
  },
  text: {
    fontSize: 30,
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
    width: 100,
    textAlign: "center", // <-- the magic
  },
  // profilepicture: {

  // }
});

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
          routes: [{ name: 'Login' }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      {/* <Avatar
        size="xlarge"
        overlayContainerStyle={{ backgroundColor: "blue" }}
        icon={{ name: "meetup", color: "red", type: "font-awesome" }}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      /> */}

      <Avatar
        // style={styles.profilepicture}
        size={200}
        rounded
        overlayContainerStyle={{ backgroundColor: "grey" }}
        icon={{ name: "user", color: "rgb(192,192,192)", type: "font-awesome" }}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        // containerStyle={{ flex: 2, marginLeft: 20, marginTop: 115 }}
      />

      {user != null && <Text style={styles.text}>{user.data().email}</Text>}
      <Text style={styles.text}>{user != null && user.data().name}</Text>

      <Button title="logout" onPress={() => logoutUser()} />
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
  // profilepicture: {

  // }
});

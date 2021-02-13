import React from "react";
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

export default function Profile({ navigation }) {
  function logoutUser() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.push("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  var user = firebase.auth().currentUser;
  if (user == null) {
    navigation.push("Login");
  }

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="logout" onPress={() => logoutUser()} />
      <Text>{user.email}</Text>
      <Text>{user.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

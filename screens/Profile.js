import React, { useContext } from "react";
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
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(firebase.auth().currentUser);
        navigation.push("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (user == null) {
    navigation.push("Login");
  }

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="logout" onPress={() => logoutUser()} />
      {user != null && <Text>{user.data().email}</Text>}
      <Text>{user != null && user.data().name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

import React, { useState } from "react";
import * as firebase from "firebase";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";

// this.state = {
//   email: "",
//   password: "",
// };

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = (email, password) => {
    //validate Password

    try {
      console.log(firebase.auth().signInWithEmailAndPassword(email, password));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../Logo/splitify.png")} />
      <View
        style={[
          styles.box,
          {
            transform: [{ translateY: -20 }],
          },
        ]}
      >
        <TextInput
          placeholder="Your Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Your Password"
          onChangeText={(text) => setPassword(text)}

          //   onChangeText={(event) => setPassword(event.target.value)}
        />
      </View>
      <Button
        title="Login"
        onPress={() => loginUser(email, password)}
        // onPress={() => navigation.push("Main")}
      />
      <Button title="Signup" onPress={() => navigation.push("Signup")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    width: 350,
    height: 350,
  },
});

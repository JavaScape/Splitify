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
  const [validate, setValidate] = useState("");
  const [password, setPassword] = useState("");

  loginUser = () => {
    //validate email

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        navigation.push("Main");
      })
      .catch((err) => {
        setValidate("Incorrect credentials entered.");
      });
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
          secureTextEntry={true}

          //   onChangeText={(event) => setPassword(event.target.value)}
        />

        {validate.length > 0 && (
          <Text style={{ color: "red" }}>{validate}</Text>
        )}
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

import React, { useState } from "react";
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

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [nameErr, setnameErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setpasswordErr] = useState("");

  const validation = () => {
    let isValid = true;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      isValid = false;
      setemailErr("The format of the email is incorrect.");
    }
    if (email.trim().length < 3) {
      isValid = false;
      setemailErr("The email length is too short to be valid.");
    }
    if (password.trim().length < 5) {
      isValid = false;
      setpasswordErr("The password provided is too short");
    }

    if (name.trim().length < 3) {
      isValid = false;
      setnameErr("The name provided is too small.");
    }

    return isValid;
  };

  const signupUser = () => {
    const val = validation();

    if (val) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          navigation.push("Main");
        })
        .catch((err) => {
          setpasswordErr("There already exists an account with that email.");
        });
    } else {
      // Need to print error messages here
    }
  };

  //   const list = () => {
  //     return this.state.emailErr.map((element) => {
  //       return <Text>{element}</Text>;
  //     });
  //   };
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
        <TextInput placeholder="Name" onChangeText={(text) => setName(text)} />
        {nameErr.length > 0 && <Text style={{ color: "red" }}>{nameErr}</Text>}

        <TextInput
          placeholder="Your Email"
          onChangeText={(text) => setEmail(text)}
        />
        {emailErr.length > 0 && (
          <Text style={{ color: "red" }}>{emailErr}</Text>
        )}

        <TextInput
          placeholder="Your Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        {passwordErr.length > 0 && (
          <Text style={{ color: "red" }}>{passwordErr}</Text>
        )}
      </View>

      <Button title="Signup" onPress={() => signupUser()} />
      <Button
        title="Already have an account? Click here."
        onPress={() => navigation.push("Login")}
      />
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

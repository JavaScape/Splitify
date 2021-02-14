import React, { useState, useContext } from "react";
import { UserContext } from "../components/userContext";
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
import "firebase/firestore";

import { Dimensions } from "react-native";

var width = Dimensions.get("window").width - 150; //full width
var height = Dimensions.get("window").height; //full height

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [nameErr, setnameErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setpasswordErr] = useState("");

  const { user, setUser } = useContext(UserContext);

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
          //

          // Add the user info to the firestore
          // firestore()
          //   .collection("users")
          //   .add({
          //     name: name,
          //     email: email,
          //     balance,
          //   })
          //   .then(() => console.log("User Added!"));

          //
          firebase
            .firestore()
            .collection("users")
            .doc(result.user.uid)
            .set({
              name: name,
              email: email,
              balance: 0,
            })
            .then((res) => {
              console.log("DIFF MSSG");

              firebase
                .firestore()
                .collection("users")
                .doc(result.user.uid)
                .get()
                .then((user) => {
                  console.log("OVER HERE!!!: " + user);
                  setUser(user);
                });

              navigation.push("Main");
            });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setpasswordErr("There already exists an account with that email.");
          } else if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          } else {
            console.log(error);
          }
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
            transform: [{ translateY: -70 }],
          },
          styles.textInputAndButton,
        ]}
      >
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={(text) => setName(text)}
        />
        {nameErr.length > 0 && (
          <Text style={{ color: "#cc3300" }}>{nameErr}</Text>
        )}
        {nameErr.length <= 0 && <Text style={{ color: "#F5F5F5" }}>.</Text>}

        <TextInput
          placeholder="Email Address"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        {emailErr.length > 0 && (
          <Text style={{ color: "#cc3300" }}>{emailErr}</Text>
        )}
        {emailErr.length <= 0 && <Text style={{ color: "#F5F5F5" }}>.</Text>}

        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        {passwordErr.length > 0 && (
          <Text style={{ color: "#cc3300" }}>{passwordErr}</Text>
        )}
        {passwordErr.length <= 0 && <Text style={{ color: "#F5F5F5" }}>.</Text>}
        <TouchableOpacity
          onPress={() => signupUser()}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push("Login")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
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
  textInputAndButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 265,
  },
  logo: {
    width: 350,
    height: 350,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderColor: "#a6a6a6",
    borderRadius: 10,
    borderWidth: 1,
    padding: 2,
    paddingLeft: 8,

    alignSelf: "center",
    width: width,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#ff8080",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    margin: 6,
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
});

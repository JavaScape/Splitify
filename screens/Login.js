import React, { useState, useContext } from "react";
import { UserContext } from "../components/userContext";
import * as firebase from "firebase";
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width - 150; //full width
var height = Dimensions.get('window').height; //full height

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

// this.state = {
//   email: "",
//   password: "",
// };

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserContext);

  const loginUser = () => {
    //validate email

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
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
            transform: [{ translateY: -70 }],
          },
          styles.textInputAndButton,
        ]}
      >
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}

        //   onChangeText={(event) => setPassword(event.target.value)}
        />
        {validate.length > 0 && (
          <Text style={{ color: "#cc3300" }}>{validate}</Text>
        )}
        {validate.length <= 0 && (
          <Text style={{ color: "#F5F5F5" }}>.</Text>
        )}
        <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("Signup")} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Signup</Text>
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
    height: 250,
  },
  logo: {
    width: 350,
    height: 350,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderColor: '#a6a6a6',
    borderRadius: 10,
    borderWidth: 1,
    padding: 2,
    paddingLeft: 8,

    alignSelf: 'center',
    width: width,


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
    textAlign: 'center', // <-- the magic
  },
});

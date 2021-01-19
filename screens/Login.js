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

// this.state = {
//   email: "",
//   password: "",
// };

export default function Login({ navigation }) {
  const [email, password] = useState(0);

  loginUser = (email, password) => {};

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
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Your Password"
          onChangeText={(password) => this.setState({ password })}
        />
      </View>
      <Button
        title="Login"
        onPress={() => this.loginUser(this.state.email, this.state.password)}
        onPress={() => navigation.push("Main")}
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

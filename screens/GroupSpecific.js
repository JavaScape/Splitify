import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Title } from "react-native-paper";

var width = Dimensions.get("window").width - 80; //full width
var height = Dimensions.get("window").height; //full height

export default function GroupSpecific({ navigation }) {
  return (
    <View style={styles.container}>
      <Title style={styles.appButtonText}>Something</Title>
      {/* <TouchableOpacity
        onPress={() => navigation.push("CreateGroup")}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Create Group</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#ecf9f2",
    height: height,
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
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    width: 120,
    textAlign: "center", // <-- the magic
  },
});

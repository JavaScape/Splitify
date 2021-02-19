import * as firebase from "firebase";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import {
  getAllGroups,
  getGroup,
  getImage,
} from "../components/firebaseCommands";
import { useIsFocused } from "@react-navigation/native";

var width = Dimensions.get("window").width - 80; //full width
var height = Dimensions.get("window").height; //full height

var width = Dimensions.get("window").width - 80; //full width
var height = Dimensions.get("window").height; //full height

export default function Group({ navigation }) {
  const focused = useIsFocused();
  const currUser = firebase.auth().currentUser;
  const [groupJson, setGroupJson] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let gids = await getAllGroups(currUser.uid);
      let groups = await Promise.all(gids.map((g) => getGroup(g)));
      const imgs = await Promise.all(gids.map((g) => getImage(g)));
      groups = groups.map((g, i) => {
        return { ...g, pic: imgs[i] };
      });
      setGroupJson(groups);
      setLoading(false);
    })();
  }, [focused]);

  return (
    <View
      contentContainerStyle={styles.outside}
      showsHorizontalScrollIndicator={false}
    >
      {!loading ? (
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.push("CreateGroup")}
              style={[
                styles.appButtonContainer,
                { backgroundColor: "#ff8080" },
                { marginTop: 20 },
                { height: 50 },
              ]}
            >
              <Text style={styles.appButtonText}>Create group</Text>
            </TouchableOpacity>

            {groupJson.map((item, k) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("GroupSpecific", groupJson[k])
                  }
                  style={[styles.appButtonContainer]}
                  key={k}
                >
                  <View style={[{ width: "100%" }]}>
                    <View style={styles.card}>
                      <View style={styles.wholeCard}>
                        <Avatar
                          size={75}
                          rounded
                          overlayContainerStyle={{ backgroundColor: "grey" }}
                          source={
                            item.pic && {
                              uri: item.pic,
                            }
                          }
                          icon={{
                            name: "user",
                            color: "#669999",
                            type: "font-awesome",
                          }}
                          activeOpacity={0.7}
                        />
                      </View>
                      <Text style={[styles.appButtonText]}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            {groupJson.length == 0 && (
              <View style={[styles.appButtonContainer]}>
                <Text style={[styles.appButtonText, { padding: 15 }]}>
                  Currently, You are not apart of any group.{" "}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <Text>Something here</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outside: {
    height: "100%",
    backgroundColor: "#ecf9f2",

    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: "auto",
    paddingBottom: 20,
    paddingTop: 20,
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
  },
  appButtonContainer: {
    elevation: 24,
    backgroundColor: "#20C9A2",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    marginBottom: 15,
    height: 100,
  },
  appButtonText: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textAlign: "center", // <-- the magic
    width: "40%",
  },
  wholeCard: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

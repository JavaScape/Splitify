import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { getGroup } from "./../components/firebaseCommands";

import { Avatar } from "react-native-elements";

import { Title } from "react-native-paper";

import { getImage, getUserByEmail } from "./../components/firebaseCommands";

var width = Dimensions.get("window").width - 80; //full width
var height = Dimensions.get("window").height; //full height

export default function GroupSpecific({ route, navigation }) {
  const TEMP_ID = route.params.groupId;
  // WILL NEED TO GO INTO USEEFFECT LATER ON
  const [group, setGroup] = useState();
  const [profilePic, setprofilePic] = useState();
  const [friends, setFriends] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // async function setter() {
    // await getGroup(TEMP_ID);

    // const groupReturn = await getGroup(TEMP_ID);

    const loader = async () => {
      if (!group) {
        const groupVal = await getGroup(TEMP_ID);
        console.log("groupVal: ", groupVal);
        await setGroup(groupVal);
        console.log("GROUP OVER HERE: ", group);
        const image = await getImage(groupVal.groupId);
        await setprofilePic(image);

        await groupVal.friends.forEach((friend) => {
          getUserByEmail(friend).then((returnVal) => {
            setFriends((prev) => [...prev, returnVal]);
          });
        });
        setLoading(false);
      }
      // await getGroup(TEMP_ID).then((res) => {
      //   setGroup(res);
      //   getImage(res.groupId).then((photoId) => {
      //     setprofilePic(photoId);
      //   });

      //   res.friends.forEach((friend) => {
      //     getUserByEmail(friend).then((returnVal) => {
      //       //          console.log("Returned val: ", returnVal);
      //       setFriends((prev) => [...prev, returnVal]);
      //     });
      //   });
      // });
    };

    loader();

    // console.log("Group returned: ", groupReturn);
    // await setGroup(groupReturn);
    // group2 = await getGroup(TEMP_ID);

    // await group.friends.forEach((friend) => {
    //   setFriends((prevArray) => [...prevArray, getUserByEmail(friend)]);

    //   console.log("group: ", group);
    //   console.log("array: " + prevArray);
    // });
    // getUserByEmail(group2.friends[0]).then((res) => {
    //   console.log(res);
    // });

    // await setprofilePic(getImage(group.groupId));
    // }

    // setter();
  }, [loading]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>I AM LOADING</Text>
      ) : (
        <View style={styles.bigBox}>
          <View style={styles.innerContainer}>
            <View style={{ marginVertical: 5 }}>
              <Avatar
                size={100}
                rounded
                overlayContainerStyle={{ backgroundColor: "grey" }}
                // source={profilePic ? { uri: profilePic } : ""}
                source={
                  profilePic
                    ? {
                        uri: profilePic,
                      }
                    : ""
                }
                icon={{
                  name: "user",
                  color: "rgb(192,192,192)",
                  type: "font-awesome",
                }}
                activeOpacity={0.7}
              />
            </View>

            <Title style={styles.appButtonText}>
              {group ? group.name : ""}
            </Title>

            {/* <TouchableOpacity
        onPress={() => navigation.push("CreateGroup")}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Create Group</Text>
      </TouchableOpacity> */}
          </View>

          <View>
            {/* <Text>Over here: {friends[0][0]}</Text> */}
            <Text>Group Members:</Text>
            {/* <Card>
            Some Text here
            <Card.Title>Let's see what you do</Card.Title>
            Some more Text Here
            <Card.Divider>Last text here</Card.Divider>
            After This
          </Card> */}
          </View>

          <View style={styles.cardBox}>
            {friends
              ? friends.map((element, index) => {
                  return (
                    <TouchableOpacity style={styles.individualCard} key={index}>
                      <Text>{element[1].name}</Text>
                    </TouchableOpacity>
                  );
                })
              : ""}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#ecf9f2",
    height: height,
    backgroundColor: "purple",
    alignItems: "center",
  },
  bigBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "80%",
    backgroundColor: "green",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "yellow",
    borderRadius: 10,
  },
  cardBox: {
    height: "80%",
    width: "80%",
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cardComponent: {
    flexDirection: "column",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#ff8080",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  appButtonText: {
    fontSize: 20,
    color: "#52575D",
    alignSelf: "center",
    textTransform: "uppercase",
    width: "50%",
    fontWeight: "200",
    // fontFamily: "HelveticaNeue-CondensedBold",
    textAlign: "center", // <-- the magic
  },
  individualCard: {
    backgroundColor: "orange",
    borderRadius: 2,
    width: "30%",
    height: "50%",
  },
});

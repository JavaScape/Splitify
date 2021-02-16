import * as firebase from "firebase";
import "firebase/firestore";
import { RecyclerViewBackedScrollViewBase } from "react-native";

var firebaseConfig = {
  apiKey: "AIzaSyBQ1JEEWRyyAWIicLofN5PbkISbGqSLz8A",
  authDomain: "splitify-d6ee9.firebaseapp.com",
  projectId: "splitify-d6ee9",
  storageBucket: "splitify-d6ee9.appspot.com",
  messagingSenderId: "722846284602",
  appId: "1:722846284602:web:f4addad17d7ecd97c2ae03",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const database = firebase.firestore();
var storageRef = firebase.storage().ref();

const uploadImage = async (image, userId) => {
  const response = await fetch(image);
  const blob = await response.blob();
  await firebase
    .storage()
    .ref()
    .child("images/" + userId)
    .put(blob);

  // await image
  //   .getDownloadURL()
  //   .then((url) => {
  //     console.log("After inserting: " + url);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
};

const getImage = async (userId) => {
  try {
    const image = await storageRef.child("images/" + userId);
    var toReturn = null;
    await image.getDownloadURL().then((url) => {
      toReturn = url;
    });
    return toReturn;
  } catch (e) {
    console.log("Error: " + e);
  }
};

const nameExist = async (val, against, col) => {
  var toReturn = false;
  if (val == null) {
    return false;
  }
  try {
    await database
      .collection(col)
      .where(against, "==", val)
      .get()
      .then((res) => {
        //{res.docs ? true : false};

        if (res.docs.length) {
          toReturn = true;
        } else {
          toReturn = false;
        }
      });
    return toReturn;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// const groupExist = async (val, uid) => {
//   var toReturn = true;
//   if (val == null) {
//     return false;
//   }

//   try {
//     await database
//       .collection("users")
//       .doc(uid)
//       .get()
//       .then((document) => {
//         console.log("document: ");
//         console.log(document.data().group.includes(val));
//         if (document.data().group.includes(val)) {
//           toReturn = true;
//         } else {
//           toReturn = false;
//         }
//       })
//       .catch((e) => {
//         console.log(e);
//       });

//     // .get()
//     // .then((res) => {
//     //   console.log("res: ");
//     //   console.log(res.docs);
//     //   // console.log("res.docs: " + res.docs);
//     // });

//     // forEach((res) => {
//     //   console.log(res.docs);
//     //   if (res.docs.group.includes(val)) {
//     //     toReturn = false;
//     //   }
//     // });
//     return toReturn;
//   } catch (e) {
//     console.log(e);
//   }
// };

// const groupExist = async (val) => {
//   var toReturn = true;
//   if (val == null) {
//     return false;
//   }
//   try {
//     await database
//       .collection("groups")
//       .where("name", "==", val)
//       .get()
//       .then((res) => {
//         //{res.docs ? true : false};

//         if (res.docs.length) {
//           toReturn = false;
//         } else {
//           toReturn = true;
//         }
//       });
//     return toReturn;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }

// };

const findUserId = async (email) => {
  var toReturn = null;
  await database
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((result) => {
      // console.log(result.docs);
      result.forEach((element) => {
        toReturn = element.id;
      });
    })
    .catch((e) => {
      console.log("CONSOLE ERROR! " + e);
    });

  return toReturn;
};

const addFriendToGroup = async (name, email) => {
  var userId = await findUserId(email);
  if (userId == null) {
    return false;
  }
  await database
    .collection("users")
    .doc(userId)
    .update({
      group: firebase.firestore.FieldValue.arrayUnion(name),
    });
};

const addGroup = async (name, friends) => {
  var newDocument = await database.collection("groups").doc();

  await newDocument
    .set({
      name: name,
      friends: friends,
      transaction: [],
      groupId: newDocument.id,
    })
    .then((res) => {
      friends.forEach((friend) => {
        addFriendToGroup(newDocument.id, friend);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return newDocument.id;
};

// Given a userID, get all the groups they are apart of
const getAllGroups = async (userId) => {

  var docRef = await database.collection("users").doc(userId);
  var toReturn = null;
  await docRef.get().then((doc) => {
    if (doc.exists) {
      toReturn = doc.data().group;
    }

  }).catch((e) => {
    console.log(e);
  })
  return toReturn;

}

const getGroup = async (groupId) => {
  var toReturn = null;
  await database
    .collection("groups")
    .doc(groupId)
    .get()
    .then((document) => {
      toReturn = document.data();
    })
    .catch((e) => {
      console.log(e);
    });
  return toReturn;
};

export {
  uploadImage,
  getImage,
  nameExist,
  addFriendToGroup,
  addGroup,
  findUserId,
  getAllGroups,
  getGroup
};

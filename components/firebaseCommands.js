import * as firebase from "firebase";
import "firebase/firestore";

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

export { uploadImage, getImage };

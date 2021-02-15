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

    var setImage = storageRef.child("images/" + userId);
    return setImage.put(blob).catch((e) => {
        console.log(e);
    });
};

const nameExist = async (email) => {

    await database.collection('users').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if (doc.data().email === email) {
                resolve(true);
            }
        })
    })
    console.log("dfadf");
    resolve(false);


};

export { uploadImage, nameExist };

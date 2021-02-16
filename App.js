import React, { useState } from "react";

import Navigation from "./routes/stack";
import * as firebase from "firebase";

import { UserContext } from "./components/userContext";

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

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navigation />
    </UserContext.Provider>
  );
}

// firebase.auth().createUserWithEmailAndPassword("testing@gmail.com", "testing2");

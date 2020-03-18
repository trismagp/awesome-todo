
var firebase = require("firebase/app");

import "firebase/auth"
import "firebase/database"


var firebaseConfig = {
  apiKey: "AIzaSyAIF-YUxrdzSGzMPE6Un3bIVyAC5ykBtUs",
  authDomain: "wishlist-d9782.firebaseapp.com",
  databaseURL: "https://wishlist-d9782.firebaseio.com",
  projectId: "wishlist-d9782",
  storageBucket: "wishlist-d9782.appspot.com",
  messagingSenderId: "91515499702",
  appId: "1:91515499702:web:0d065fbbdb86589ca62217",
  measurementId: "G-WTKR9R3P05"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export {firebaseAuth,firebaseDb}
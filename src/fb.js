
import firebase from 'firebase/app'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    //databaseURL: "https://dsipdemo.firebaseio.com",
    apiKey: "AIzaSyDN5cYxDvw7iryDV2MCWtHVp0fY8BgcVK0",
    authDomain: "dsipdemo.firebaseapp.com",
    projectId: "dsipdemo",
    storageBucket: "dsipdemo.appspot.com",
    messagingSenderId: "554990160161",
    appId: "1:554990160161:web:9dbcd560d6a47486f81660"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
//  db.settings({ timestampsInSnapshots: true });
  
  export default db;

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC7eSxiynsWHz8u9GBFN_MF9Ysaa3SrCbs",
    authDomain: "nba-app-911ec.firebaseapp.com",
    databaseURL: "https://nba-app-911ec.firebaseio.com",
    projectId: "nba-app-911ec",
    storageBucket: "nba-app-911ec.appspot.com",
    messagingSenderId: "378666310357",
    appId: "1:378666310357:web:f4d4bd2b0e3171a7c0e05c",
    measurementId: "G-LE37ZFW5PP"
  };

  firebase.initializeApp(firebaseConfig);

  const firebaseDB = firebase.database();
  const firebaseArticles = firebaseDB.ref('articles');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebaseVideos = firebaseDB.ref('videos');

  const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    return data;
  }

  export {
      firebase,
      firebaseDB,
      firebaseArticles,
      firebaseTeams,
      firebaseVideos,
      firebaseLooper
  }
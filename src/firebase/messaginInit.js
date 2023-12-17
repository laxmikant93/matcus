import firebase from "firebase/compat/app";
const firebaseConfig = {
  apiKey: "AIzaSyAOZ1R9KL8tORRHcl4Org_d07onMRKowFk",
  authDomain: "edneed-73e50.firebaseapp.com",
  databaseURL: "https://edneed-73e50.firebaseio.com",
  projectId: "edneed-73e50",
  storageBucket: "edneed-73e50.appspot.com",
  messagingSenderId: "971344965786",
  appId: "1:971344965786:web:567e303930eb2876922f23",
};

let messaging = undefined;
// if (firebase.messaging.isSupported()) {
//   const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);
//   messaging = initializedFirebaseApp.messaging();
// }
// messaging.usePublicVapidKey("BAVut7pnSX2aluOAQUTyeNABXL3rzlD7juI3-flDXPEiAar_QHMtzHhts2lMNwzSZCUqMMmfa0kb_BEDGTznYbw");

export { messaging };

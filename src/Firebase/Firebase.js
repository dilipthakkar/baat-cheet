import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBDMcG5dRCUgLxhBJuL7HjCCe_BXiy00z8",
    authDomain: "real-chat-app-f5075.firebaseapp.com",
    projectId: "real-chat-app-f5075",
    storageBucket: "real-chat-app-f5075.appspot.com",
    messagingSenderId: "660327917921",
    appId: "1:660327917921:web:b2b8b9d61c0a35733cbd20",
    measurementId: "G-F93HMN5240"
};
const firebaseApp = firebase.apps.length===0 ? firebase.initializeApp(firebaseConfig) : firebase.app(); 
export default firebaseApp ; 

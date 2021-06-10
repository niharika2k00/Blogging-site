
import firebase from "firebase";   // this name is used in line 19


const firebaseConfig = {
    apiKey: "AIzaSyAhekb0qN7sq7yr7m7cfIh6OKLbeXtko_w",
    authDomain: "blogging-website-76b68.firebaseapp.com",
    projectId: "blogging-website-76b68",
    storageBucket: "blogging-website-76b68.appspot.com",
    messagingSenderId: "482161156202",
    appId: "1:482161156202:web:9042a66d23087490d3aa13",
    measurementId: "G-XDLWSKHMZF"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// export const auth = app.auth();
export const firestore = app.firestore();



export default app;
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 5000);
});

// Existing code for handling user information and logout
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVG6nj6gMiJjOY1bFW0ZKt_3Elv4gss2A",
  authDomain: "project401-c1a2c.firebaseapp.com",
  projectId: "project401-c1a2c",
  storageBucket: "project401-c1a2c.appspot.com",
  messagingSenderId: "68422425832",
  appId: "1:68422425832:web:19d5fa36e3a8056e917d5d",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    console.log(user);
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("loggedUserFName").innerText =
            userData.firstName;
          document.getElementById("loggedUserEmail").innerText = userData.email;
          document.getElementById("loggedUserLName").innerText =
            userData.lastName;
        } else {
          console.log("No document found matching id");
        }
      })
      .catch((error) => {
        console.log("Error getting document", error);
      });
  } else {
    console.log("User Id not Found in Local storage");
  }
});

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error Signing out:", error);
    });
});

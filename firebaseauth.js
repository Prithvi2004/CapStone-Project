import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
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

function showPopup(message) {
  const popup = document.getElementById("notificationPopup");
  popup.innerHTML = message;
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 5000);
}

const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      };
      showPopup("Account Created Successfully");
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/email-already-in-use") {
        showPopup("Email Address Already Exists !!!");
      } else {
        showPopup("Unable to create User");
      }
    });
});

const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showPopup("Login is successful");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        showPopup("Incorrect Email or Password");
      } else {
        showPopup("Account does not Exist");
      }
    });
});

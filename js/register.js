import { firebaseConfig } from "./firebaseConfig.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            console.error("Registration failed:", error.message);
            throw error;
        });
}

document.getElementById("registerBtn").addEventListener("click", async () => {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("cpassword").value = "";

    if ((email && password && cpassword) && (password.length >= 6) && (password === cpassword)) {
        try {
            const user = await register(email, password);
            window.location.href = "login.html";
        } catch (error) {
            document.getElementById("status").innerText = `Registration failed: ${error.message}`;
        }
    } else {
        document.getElementById("status").innerText = "Please ensure all fields are filled correctly.";
    }
});
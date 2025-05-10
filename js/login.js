import { firebaseConfig } from "./firebaseConfig.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
                        console.error("Login failed:", error.message);
            throw error;
        });
}

document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    try {
        const user = await login(email, password);
        window.location.href = "../dashboard.html";
    } catch (error) {
        document.getElementById("status").innerText = "Login failed. Please check your credentials.";
    }
});
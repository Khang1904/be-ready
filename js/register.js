const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function register(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            console.error("Registration failed:", error.message);
            throw error;
        });
}

document.getElementById("registerBtn").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;

    document.getElementById("username").value = "";    
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("cpassword").value = "";

    if ((email && password && cpassword) && (password.length >= 6) && (password === cpassword)) {
        try {
            const user = await register(email, password);
            await db.collection("users").doc(user.uid).set({
                username: username,
                email: email,
                role: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            window.location.href = "login.html";
        } catch (error) {
            document.getElementById("status").innerText = `Registration failed: ${error.message}`;
        }
    } else {
        document.getElementById("status").innerText = "Please ensure all fields are filled correctly.";
    }
});
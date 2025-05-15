const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
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
        window.location.href = "./dashboard.html";
    } catch (error) {
        document.getElementById("status").innerText = `Login failed. ${error.message}`;
    }
});
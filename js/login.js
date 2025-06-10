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
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    try {
        const user = await login(email, password);
        db.collection("users").doc(user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    if (doc.data().role === 1) {
                        window.location.href = "../pages/admin.html";
                    } else {
                        window.location.href = "../pages/dashboard.html";
                    }
                } else {
                    document.getElementById("status").innerText = "No such user!";
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    } catch (error) {
        document.getElementById("status").innerText = `Login failed. ${error.message}`;
    }
});
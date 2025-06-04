const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "../pages/dashboard.html";
        return;
    }
    db.collection("users").doc(user.uid).get()
        .then(doc => {
            if (doc.exists) {
                if (doc.data().role !== 1) {
                    window.location.href = "../pages/dashboard.html";
                }
            } else {
                window.location.href = "../pages/dashboard.html";
            }
        })
        .catch(() => {
            window.location.href = "../pages/dashboard.html";
        });
});

function signOutUser() {
    auth.signOut()
        .then(() => {
            console.log("User signed out.");
            window.location.href = '../index.html';
        })
        .catch((error) => {
            console.error("Sign out error:", error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const signOutBtn = document.querySelector('.signout');
    signOutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signOutUser();
    });
});
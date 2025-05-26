const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is signed in:", user.uid);
        db.collection('users').doc(user.uid).get()
            .then((doc) => {
                const userData = doc.data();
                document.querySelector('#greet').innerHTML = `Welcome back, ${userData.username}`
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    } else {
        console.log("No user is signed in.");
        window.location.href = './login.html';
    }
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
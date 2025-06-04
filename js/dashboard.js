const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is signed in:", user.uid);
        db.collection('users').doc(user.uid).get()
            .then((doc) => {
                const userData = doc.data();
                document.querySelector('#greet').innerHTML = `Welcome back, ${userData.username}`;
                if (userData.role === 1) {
                    console.log("User is an admin.");
                    const adminLink = document.createElement('a');
                    adminLink.href = './admin.html';
                    adminLink.textContent = 'Go to Admin Dashboard';
                    adminLink.id = 'adminLink';
                    document.querySelector('.header').appendChild(adminLink);
                }
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
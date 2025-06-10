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

const apiKey = "AIzaSyAIPD51IYMZbYfb9pFNUfK_w1phXfKcaYo";
const endpoint = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

function generateSummary() {
    const summary = document.getElementById("summary")

    const requestBody = {
        contents: [{ role: "user", parts: [{ text: "Generate a 1 minute read summary of the latest news in terms of medical." }] }]
    };

    fetch(`${endpoint}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        let answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";
        summary.innerHTML = marked.parse(answer);
    })
    .catch(error => {
        summary.innerHTML = "Error fetching summary.";
        console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const signOutBtn = document.getElementById("signout");
    if (signOutBtn) {
        signOutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            signOutUser();
        });
    }
    generateSummary();
});
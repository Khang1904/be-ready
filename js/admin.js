auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "../pages/dashboard.html";
    return;
  }
  db.collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
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
  auth
    .signOut()
    .then(() => {
      console.log("User signed out.");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Sign out error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const signOutBtn = document.querySelector(".signout");
  signOutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signOutUser();
  });
});

function findUserByUsername(username) {
  return db
    .collection("users")
    .where("username", "==", username)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        document.querySelector("#status1").innerHTML = "User not found";
        return;
      }
      document.querySelector("#status1").innerHTML =
        "User found. Proceed to the next step.";
      return querySnapshot.docs[0].data();
    });
}

function adminRights(username, role) {
  return db
    .collection("users")
    .where("username", "==", username) // Fixed: use '==' not '==='
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        document.querySelector("#status1").innerHTML = "User not found.";
        return;
      }
      const userDoc = querySnapshot.docs[0];
      return userDoc.ref.update({ role: role }).then(() => {
        if (role === 1) {
          document.querySelector("#status2").innerHTML =
            "User has been granted admin rights.";
        } else {
          document.querySelector("#status2").innerHTML =
            "User has been revoked admin rights.";
        }
      });
    });
}

let foundUser = false;

document.getElementById("search").addEventListener("click", (e) => {
  e.preventDefault();
  status1 = false; // Reset status1 at the start of each search
  const username = document.getElementById("username").value.trim();
  document.getElementById("username").value = "";

  if (username) {
    findUserByUsername(username)
      .then((userData) => {
        if (userData) {
          document.querySelector(
            "#status1"
          ).innerHTML = `User found: ${userData.username}<br>Proceed to the next step.`;
          foundUser = username; // Store the found username for later use
        }
      })
      .catch((error) => {
        console.error("Error finding user:", error);
        document.querySelector("#status1").innerHTML = "Error finding user.";
      });
  } else {
    document.querySelector("#status1").innerHTML = "Please enter a username.";
  }
});

document.getElementById("confirm").addEventListener("click", (e) => {
  e.preventDefault();
  const username = foundUser; // Use the username from the last successful search
  const action = document.getElementById("actions").value;

  switch (action) {
    case "grant":
      var role = 1; // Admin
      break;
    case "revoke":
      var role = 0; // Regular user
      break;
    default:
      document.querySelector("#status2").innerHTML = "Please select an action.";
      return;
  }

  if (username) {
    adminRights(username, parseInt(role))
      .then(() => {
        document.querySelector("#status2").innerHTML = `Admin rights updated for ${username}.`;
      })
      .catch((error) => {
        console.error("Error updating admin rights:", error);
        document.querySelector("#status2").innerHTML = "Error updating admin rights.";
      });
  } else {
    document.querySelector("#status2").innerHTML = "Please search for a user first.";
  }
});
// Firebase Authentication Logic

function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Signed up successfully!");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Logged in successfully!");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function logout() {
  firebase.auth().signOut().then(() => {
    alert("Logged out");
  });
}

firebase.auth().onAuthStateChanged((user) => {
  const status = document.getElementById("user-status");
  if (user) {
    status.innerText = `Logged in as: ${user.email}`;
  } else {
    status.innerText = "Not logged in";
  }
});

// Theme toggle (dark/light mode)
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

// Firebase Authentication Logic

function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
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
    .then(() => {
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
  document.body.classList.toggle("light-mode");
}

// ------------------- Cloudinary Upload & Video Display ---------------------

// Your Cloudinary details - REPLACE with your own
const cloudName = 'your_cloud_name';
const uploadPreset = 'your_unsigned_upload_preset';

// Store uploaded videos with titles for rendering & filtering
const videos = [];

function uploadVideo() {
  const fileInput = document.getElementById('videoUpload');
  const titleInput = document.getElementById('videoTitle');
  const status = document.getElementById('upload-status');
  const file = fileInput.files[0];
  const title = titleInput.value.trim() || "Untitled";

  if (!file) {
    status.innerText = "Please select a video file.";
    return;
  }

  status.innerText = "Uploading...";

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    status.innerText = "Upload successful!";
    displayVideo(data.secure_url, title);
    fileInput.value = "";
    titleInput.value = "";
  })
  .catch(err => {
    status.innerText = "Upload failed.";
    console.error(err);
  });
}

function displayVideo(url, title = "Untitled") {
  videos.push({ url, title });
  renderVideos(videos);
}

function renderVideos(videoList) {
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = ''; // Clear existing videos

  videoList.forEach(video => {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.innerHTML = `
      <video controls width="300">
        <source src="${video.url}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>${video.title}</p>
    `;
    grid.appendChild(videoCard);
  });
}

// Search/filter functionality
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(query)
  );
  renderVideos(filteredVideos);
});

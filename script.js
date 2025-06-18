// Firestore reference
const db = firebase.firestore();

// Store uploaded videos
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
  formData.append('upload_preset', 'your_unsigned_upload_preset');

  fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/video/upload`, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    const videoData = {
      url: data.secure_url,
      title,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    // Save to Firestore
    return db.collection("videos").add(videoData);
  })
  .then(() => {
    status.innerText = "Upload successful!";
    fileInput.value = "";
    titleInput.value = "";
  })
  .catch(err => {
    status.innerText = "Upload failed.";
    console.error(err);
  });
}

// Load all videos from Firestore on page load
function fetchVideos() {
  db.collection("videos")
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      videos.length = 0; // clear existing
      snapshot.forEach(doc => {
        const data = doc.data();
        videos.push({ title: data.title, url: data.url });
      });
      renderVideos(videos);
    })
    .catch(err => {
      console.error("Error fetching videos:", err);
    });
}

// Render videos
function renderVideos(videoList) {
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = '';

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

// Filter videos
document.getElementById('searchBar').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = videos.filter(video =>
    video.title.toLowerCase().includes(query)
  );
  renderVideos(filtered);
});

// Call fetchVideos when page loads
window.onload = fetchVideos;

// Replace these with your actual Cloudinary values
const cloudName = 'your_cloud_name';
const uploadPreset = 'your_unsigned_upload_preset';

function uploadVideo() {
  const fileInput = document.getElementById('videoUpload');
  const status = document.getElementById('upload-status');
  const file = fileInput.files[0];

  if (!file) {
    status.innerText = "Please select a video file.";
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  status.innerText = "Uploading...";

  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    status.innerText = "Upload successful!";
    displayVideo(data.secure_url);
  })
  .catch(err => {
    status.innerText = "Upload failed.";
    console.error(err);
  });
}

function displayVideo(url) {
  const grid = document.getElementById('videoGrid');
  const videoCard = document.createElement('div');
  videoCard.className = 'video-card';
  videoCard.innerHTML = `
    <video controls width="300">
      <source src="${url}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;
  grid.prepend(videoCard);
}

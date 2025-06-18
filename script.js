const videos = [
  { title: "Afrobeat Vibe", url: "https://www.youtube.com/embed/XeRtxN1P5Uo" },
  { title: "RnB Chill", url: "https://www.youtube.com/embed/k1-BFM3EIVk" },
  { title: "Trap Night", url: "https://www.youtube.com/embed/z4A6e8SStU0" },
  { title: "Lo-fi Dreams", url: "https://www.youtube.com/embed/jfKfPfyJRdk" },
];

const container = document.getElementById("video-list");
const searchInput = document.getElementById("search-input");
const toggleBtn = document.getElementById("toggle-mode");

function renderVideos(filter = "") {
  container.innerHTML = "";
  videos
    .filter(video => video.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach(video => {
      const wrapper = document.createElement("div");
      wrapper.className = "video-card";

      const title = document.createElement("h3");
      title.textContent = video.title;

      const frame = document.createElement("iframe");
      frame.src = video.url;
      frame.width = "100%";
      frame.height = "315";
      frame.allowFullscreen = true;

      wrapper.appendChild(title);
      wrapper.appendChild(frame);
      container.appendChild(wrapper);
    });
}

searchInput.addEventListener("input", (e) => {
  renderVideos(e.target.value);
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  toggleBtn.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌗";
});

renderVideos(); // Initial render

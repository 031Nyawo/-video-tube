const videos = [
  { title: "Afrobeat Vibe", url: "https://www.youtube.com/embed/XeRtxN1P5Uo" },
  { title: "RnB Chill", url: "https://www.youtube.com/embed/k1-BFM3EIVk" },
];

const container = document.getElementById("video-list");

videos.forEach(video => {
  const frame = document.createElement("iframe");
  frame.src = video.url;
  frame.width = "560";
  frame.height = "315";
  frame.allowFullscreen = true;

  const title = document.createElement("h3");
  title.textContent = video.title;

  container.appendChild(title);
  container.appendChild(frame);
});

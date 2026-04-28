const videoFeature = document.getElementById("videoFeature");
const whyVideo = document.getElementById("whyVideo");
const videoPlayButton = document.getElementById("videoPlayButton");
const muteButton = document.getElementById("muteButton");

if (videoFeature && whyVideo && videoPlayButton && muteButton) {
  whyVideo.muted = false;
  whyVideo.volume = 1;

  const syncState = () => {
    const isPlaying = !whyVideo.paused && !whyVideo.ended;
    videoFeature.classList.toggle("is-playing", isPlaying);
  };

  const startPlayback = () => {
    if (whyVideo.ended) {
      whyVideo.currentTime = 0;
    }

    const playPromise = whyVideo.play();

    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(syncState)
        .catch(() => {
          videoFeature.classList.remove("is-playing");
        });
      return;
    }

    syncState();
  };

  const togglePlayPause = () => {
    if (whyVideo.paused || whyVideo.ended) {
      startPlayback();
    } else {
      whyVideo.pause();
      syncState();
    }
  };

  videoFeature.addEventListener("click", togglePlayPause);

  videoPlayButton.addEventListener("click", (event) => {
    event.stopPropagation();
    togglePlayPause();
  });

  videoFeature.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePlayPause();
    }
  });

  muteButton.addEventListener("click", (event) => {
    event.stopPropagation();

    whyVideo.muted = !whyVideo.muted;
    muteButton.textContent = whyVideo.muted ? "Sound: Off" : "Sound: On";
    muteButton.setAttribute("aria-pressed", String(whyVideo.muted));
    muteButton.setAttribute("aria-label", whyVideo.muted ? "Unmute video" : "Mute video");
  });

  whyVideo.addEventListener("play", syncState);
  whyVideo.addEventListener("pause", syncState);
  whyVideo.addEventListener("ended", syncState);
}

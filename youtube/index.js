/* global YT */

let video;
let ambilight;
const videoId = "_OmLYckdMvI";

// eslint-disable-next-line unused-imports/no-unused-vars
function onYouTubeIframeAPIReady() {
  video = new YT.Player("video", {
    videoId,
    events: {
      onReady: videoReady,
      onStateChange: videoStateChange,
    },
  });

  ambilight = new YT.Player("ambilight", {
    videoId,
    events: {
      onReady: ambilightReady,
      onStateChange: ambilightStateChange,
    },
  });
}

// eslint-disable-next-line unused-imports/no-unused-vars
function videoReady(event) {
  // event.target.setPlaybackQuality("default");
}

function videoStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      ambilight.seekTo(event.target.getCurrentTime());
      ambilight.playVideo();
      break;
    case YT.PlayerState.PAUSED:
      ambilight.seekTo(event.target.getCurrentTime());
      ambilight.pauseVideo();
      break;
  }
}

function optimizeAmbilight(event) {
  const qualityLevels = event.target.getAvailableQualityLevels();
  event.target.mute();
  if (qualityLevels && qualityLevels?.length > 0) {
    qualityLevels.reverse();
    const lowestLevel =
      qualityLevels[qualityLevels.findIndex((q) => q !== "auto")];
    event.target.setPlaybackQuality(lowestLevel);
  }
}

function ambilightReady(event) {
  optimizeAmbilight(event);
}

function ambilightStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.BUFFERING:
    case YT.PlayerState.PLAYING:
      optimizeAmbilight(event);
      break;
  }
}

function step() {
  ambilight.seekTo(video.getCurrentTime());
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

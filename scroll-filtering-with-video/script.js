// nodes
const contentElement = document.getElementById("content");
const startBtn = document.getElementById("start-btn");
const cutoffFreqDisplay = document.getElementById("cutoff-freq");
const progressDisplay = document.getElementById("progress-percentage");
const scrollVideo = document.getElementById("scroll-video");

// constants
const AUDIO_FILE = "./dark-mystery-trailer-taking-our-time-131566.mp3";
const START_FREQUENCY = 100;
const END_FREQUENCY = 20000;

let lowpassFilter;
const startExperience = () => {
  startBtn.style.opacity = 0;
  document.body.style.overflow = "scroll";
};

const loadAndPlayAudio = async () => {
  // Set up the Web Audio API context, lowpass filter, and gain node
  const audioContext = new (AudioContext || window.webkitAudioContext)();
  lowpassFilter = audioContext.createBiquadFilter();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.5; // Adjust the gain value (0.5 for 50% volume)

  // Connect the gain node to the lowpass filter
  gainNode.connect(lowpassFilter);
  lowpassFilter.connect(audioContext.destination);

  //--------------
  const response = await fetch(AUDIO_FILE);
  const data = await response.arrayBuffer();
  const buffer = await audioContext.decodeAudioData(data);
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(gainNode);

  lowpassFilter.frequency.value = START_FREQUENCY;

  // Start the music playback
  source.start();
};

const addScrollListeners = () => {
  window.addEventListener("scroll", function () {
    const scrollProgress =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);

    // Map scroll progress to logarithmic scale for cutoff frequency
    const filterFrequency =
      START_FREQUENCY *
      Math.exp(scrollProgress * Math.log(END_FREQUENCY / START_FREQUENCY));

    // Apply the cutoff frequency to the lowpass filter
    lowpassFilter.frequency.value = filterFrequency;

    // update monitor
    cutoffFreqDisplay.textContent = Math.trunc(filterFrequency) + "hz";
    progressDisplay.textContent =
      (Number(scrollProgress) * 100).toFixed(2) + "%";
    scrollVideo.style.opacity = 1 - Number(scrollProgress) / 2;
  });
};

const loadVideo = () => {
  var isScrolling;

  function throttleScroll() {
    if (!isScrolling) {
      isScrolling = true;

      setTimeout(function () {
        var scrollPercentage =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100;
        scrollVideo.currentTime =
          (scrollVideo.duration * scrollPercentage) / 100;
        isScrolling = false;
      }, 50); // Adjust the throttle time (in milliseconds) as needed
    }
  }

  window.addEventListener("scroll", throttleScroll);
};

// ---- start ----
document.addEventListener("DOMContentLoaded", () => {
  startBtn.addEventListener("click", async () => {
    startExperience();
    await loadAndPlayAudio();
    // Adjust the cutoff frequency based on scroll position (logarithmic scale)
    addScrollListeners();
    loadVideo();
  });
});

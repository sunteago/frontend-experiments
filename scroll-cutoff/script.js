document.addEventListener('DOMContentLoaded', function () {
    const music = document.getElementById('music');
    const content = document.getElementById('content');

    // Adjust the cutoff frequency based on scroll position
    window.addEventListener('scroll', function () {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const cutoffFrequency = /* Calculate cutoff frequency based on scrollProgress */;
        // Apply the cutoff frequency to the music (use the appropriate API or library)
        applyLowpassFilter(music, cutoffFrequency);
    });

    function applyLowpassFilter(audioElement, cutoffFrequency) {
        // Implement the logic to apply a lowpass filter to the audio
        // You might need to use a library like Tone.js or the Web Audio API
        // Example using Tone.js:
        // audioElement.lowpass(cutoffFrequency);
    }
});

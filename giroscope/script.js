var gyroCube = document.getElementById("gyroCube");

function requestSensorPermission() {
  if (window.DeviceOrientationEvent) {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        } else {
          document.getElementById("gyroData").innerText =
            "Permission denied for motion and orientation access.";
        }
      })
      .catch((error) => {
        console.error("Error requesting motion and orientation access:", error);
        document.getElementById("gyroData").innerText =
          "Error requesting motion and orientation access.";
      });
  } else {
    document.getElementById("gyroData").innerText =
      "Sorry, your device does not support gyroscope.";
  }
}

function handleOrientation(event) {
  var beta = event.beta;
  var gamma = event.gamma;

  // Display gyroscope data
  document.getElementById("gyroData").innerText = `
    Beta (X-axis): ${beta.toFixed(2)} degrees
    Gamma (Y-axis): ${gamma.toFixed(2)} degrees
  `;

  // Update cube rotation based on gyroscope data
  gyroCube.style.transform =
    "rotateX(" + beta + "deg) rotateY(" + gamma + "deg)";
}

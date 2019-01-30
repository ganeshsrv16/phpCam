
var properties = { video: { facingMode: "user" }, audio: false };  //properties to set the video frame

const cameraView = document.querySelector("#cameraView"),   // camera control
    cameraOutput = document.querySelector("#cameraOutput"), // output of the pic
    cameraSensor = document.querySelector("#cameraSensor"), // canvas tag in order to get the screened pic
    cameraTrigger = document.querySelector("#cameraTrigger") // button take photo

function cameraStart() {
    navigator.mediaDevices         
        .getUserMedia(properties)  // getUserMedia is the Api which can access the camera and returns a promise
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp"); // base 64 conversion
    console.log('src', cameraOutput.src);
    cameraOutput.classList.add("taken");
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false); // on page load this event triggers intially

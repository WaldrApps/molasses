const video = document.querySelector('video');
const capture = document.getElementById('capture');
const canvas = document.getElementById('canvas');
const label = document.getElementById('label');
const context = canvas.getContext('2d');

const constraints = {
  video: true
};

navigator.mediaDevices.getUserMedia(constraints).then(
    (stream) => {video.srcObject = stream}
);

capture.addEventListener("click", async () => {
    // for(i = 0; i < 1000; i++) {
        console.log("picture");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL("image/png");
        let request = $.ajax({
            url: "saveImage",
            type: "POST",
            data: {
                label: label.value,
                image: data
            }
        });

    // }
});

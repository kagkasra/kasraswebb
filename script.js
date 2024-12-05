const selectImageButton = document.getElementById("select-image");
const imageInput = document.getElementById("image-input");
const selectedImage = document.getElementById("selected-image");


const startCameraButton = document.getElementById("start-camera");
const cameraStream = document.getElementById("camera-stream");
const capturePhotoButton = document.getElementById("capture-photo");
const photoCanvas = document.getElementById("photo-canvas");
const photoContext = photoCanvas.getContext("2d");


const sendImageButton = document.getElementById("send-image");


let imageData = null;


selectImageButton.addEventListener("click", () => {
    imageInput.click();
});

imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage.src = e.target.result;
            selectedImage.style.display = "block";
            imageData = e.target.result; 
        };
        reader.readAsDataURL(file);
    }
});


startCameraButton.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraStream.srcObject = stream;
        cameraStream.style.display = "block";
        capturePhotoButton.style.display = "block";
    } catch (err) {
        alert("دسترسی به دوربین ممکن نیست: " + err.message);
    }
});


capturePhotoButton.addEventListener("click", () => {
    photoCanvas.width = cameraStream.videoWidth;
    photoCanvas.height = cameraStream.videoHeight;

    photoContext.drawImage(cameraStream, 0, 0);
    imageData = photoCanvas.toDataURL("image/png"); 
    selectedImage.src = imageData;
    selectedImage.style.display = "block";

    alert("عکس گرفته شد!");
});

// ارسال عکس
sendImageButton.addEventListener("click", () => {
    if (imageData) {
        alert("عکس ارسال شد:\n" + imageData);
        
        console.log("ارسال عکس:", imageData);
    } else {
        alert("ابتدا یک عکس انتخاب کنید یا بگیرید.");
    }
});

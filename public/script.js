const API_URL = window.location.hostname === "localhost"
    ? "http://localhost:3000/api/upload"
    : "https://app-backend-server-g2juyizaz-iasaiah-alves-projects.vercel.app/api/upload";

document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("uploadForm");
    const imageInput = document.getElementById("imageInput");
    const uploadedImage = document.getElementById("uploadedImage");
    const uploadStatus = document.getElementById("uploadStatus"); 

    uploadForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!imageInput.files.length) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageInput.files[0]);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("Server Response:", result);

            if (response.ok && result.file) {
                uploadedImage.style.display = "none";
                uploadStatus.innerHTML = "🎉 Uploaded Successfully!";
                uploadStatus.style.color = "green"; 
            } else {
                uploadStatus.innerHTML = "❌ Upload failed: " + result.message;
                uploadStatus.style.color = "red";
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            uploadStatus.innerHTML = "❌ Upload failed. Please try again.";
            uploadStatus.style.color = "red";
        }
    });
});

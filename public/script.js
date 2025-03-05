// require('dotenv').config(); // Removed, not needed in browser

// Determine API base URL and upload behavior based on environment
let API_BASE_URL;
let isLocal = false; // Flag to track local environment

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  API_BASE_URL = "http://localhost:3000"; // Or your local port
  isLocal = true;
  console.log("Running in local environment");
} else {
  API_BASE_URL = window.location.origin; //Vercel's URL. Automatically detects it
  console.log("Running in Vercel environment");
}

document.addEventListener("DOMContentLoaded", function () {
  const uploadForm = document.getElementById("uploadForm");
  const imageInput = document.getElementById("imageInput");
  const uploadStatus = document.getElementById("uploadStatus");

  uploadForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!imageInput.files.length) {
      alert("Please select a file first!");
      return;
    }

    const file = imageInput.files[0];

    if (isLocal) {
      // Local upload handling (simulated for client-side demonstration)
      uploadStatus.innerHTML = "Uploading to local 'uploads' folder...";
        
        // Simulate saving to a local folder (this part won't actually save to disk on the client-side).
        // You would need backend code to handle saving to the local file system if you choose to do that.
        console.log("Simulating local file upload:", file.name);
        uploadStatus.innerHTML = `🎉 Uploaded Successfully to local environment! <br> (Simulated save to 'uploads/${file.name}')`;
        uploadStatus.style.color = "green";
    } else {
      // Vercel upload handling (your existing logic)
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(`${API_BASE_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        console.log("Server Response:", result);

        if (response.ok) {
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
    }
  });
});

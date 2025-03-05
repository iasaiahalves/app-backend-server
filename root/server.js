const http = require("http");
const app = require("../src/app.js"); // Import the Express app
const dotenv = require("dotenv");

dotenv.config();

// Determine the port based on the environment
let PORT;

if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV) {
    // Vercel or production environment
    PORT = process.env.PORT || 8080; // Vercel typically provides the port in process.env.PORT. If not for some reason use 8080 as default
} else {
    // Local development
    PORT = process.env.PORT || 3000; // Use the .env port if set, otherwise default to 3000
}

// Start Server
const server = http.createServer(app); // Use the imported app

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  if(process.env.NODE_ENV !== 'production' && !process.env.VERCEL_ENV){
    console.log("This is running in local environment");
  }
});

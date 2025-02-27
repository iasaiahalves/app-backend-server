const http = require("http");
const app = require("../src/app.js"); // Import the Express app
const dotenv = require("dotenv");

dotenv.config();

// Start Server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app); // Use the imported app

server.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

const http = require("http");
const dotenv = require("dotenv");
const app = require("../src/app.js");


dotenv.config();


//  Start Server
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
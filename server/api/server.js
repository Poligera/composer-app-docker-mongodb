// Routing logic
const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json()); // method recognising any incoming Request Object as a JSON Object

const routes = require("./controllers/composers");

server.use("/composers", routes); // detailed non-root routes from that file

// Root route:
server.get("/", (req, res) => res.send("Hello from Composer App!"));

module.exports = server;

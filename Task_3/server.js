const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
    res.end(fs.readFileSync("./ws.html"));
  }
});
server.listen(3000);

let currentId = 0;

const wsServer = new WebSocket.Server({port: 4000, host: "localhost", path: "/wsserver"});
wsServer.on("connection", ws => {
  currentId++;

  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`New client has been connected with number: ${currentId}\n`);
      console.log("One more client");
    } 
  });

  ws.on("message", message => {
    wsServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`"message": ${message}`);
      } 
    });
  });

  ws.on("close", () => {
    currentId--;

    wsServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`"id": ${currentId}\n`);
        console.log("Server lost one client");
      } 
    });
  });
});
wsServer.on("error", err => console.log("WS server error", err));
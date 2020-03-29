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

const wsServer = new WebSocket.Server({port: 4000, host: "localhost", path: "/wsserver"});
wsServer.on("connection", ws => {
  ws.on("message", message => {
    console.log(message);
  });
  let i = 0;
  setInterval(() => ws.send(`Server send message every 3 seconds. Message №${++i}`), 3000);
});
wsServer.on("error", err => console.log("WS server error", err));

const WebSocket = require("ws");
const fs = require("fs");

const wss = new WebSocket.Server({port: 4000, host: "localhost"});
wss.on("connection", ws => {
  const duplex = WebSocket.createWebSocketStream(ws, {encoding: "utf8"});
  let rfile = fs.createReadStream("./my_file.txt");
  rfile.pipe(duplex);

  console.log("File downloaded");
});
wss.on("error", err => console.log("WS server error", err));
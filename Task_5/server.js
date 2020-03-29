const WebSocket = require("ws");
const fs = require("fs");

const wss = new WebSocket.Server({port: 4000, host: "localhost"});
let i = 0;
wss.on("connection", ws => {
  const duplex = WebSocket.createWebSocketStream(ws, {encoding: "utf8"});
  let wfile = fs.createWriteStream(`./upload_files/file_${++i}.txt`);
  duplex.pipe(wfile);
  console.log("File uploaded");
});
wss.on("error", err => console.log("WS server error", err));
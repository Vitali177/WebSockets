const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket("ws:/localhost:4000");
ws.on("open", () => {
  const duplex = WebSocket.createWebSocketStream(ws, {encoding: "utf8"});
  let rfile = fs.createReadStream("./my_file.txt");
  rfile.pipe(duplex);
});

const WebSocket = require("ws");
const ws = new WebSocket("ws:/localhost:4000/wsserver");

let k = 0;
const defaultId = "777";
const clientId = process.argv[2] || defaultId;


ws.on("open", () => {
  setInterval(() => {
    ws.send(`client - ${clientId} send message #${++k}`);
  }, 3000);

  ws.on("message", message => {
    if (message.indexOf("id") === -1) {
      console.log(`${message}`);
    }
  });

  ws.on("ping", data => console.log("on ping:", data.toString()));
});
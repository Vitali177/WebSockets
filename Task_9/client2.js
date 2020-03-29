const rpcWSC = WebSocket = require("rpc-websockets").Client
let ws = new rpcWSC("ws://localhost:4000");
let k = 0;

ws.on("open", () => {
  const intervalNotify2 = setInterval(() => ws.notify("notify2", {"x": ++k}), 500);

  setTimeout(() => {
    clearInterval(intervalNotify2);
    console.log("Client has stopped generate notify");
  }, 10000);
});
ws.on("error", e => console.log("error = ", e));


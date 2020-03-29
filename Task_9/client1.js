const rpcWSC = WebSocket = require("rpc-websockets").Client
let ws = new rpcWSC("ws://localhost:4000");
let k = 0;

ws.on("open", () => {
  const intervalNotify1 = setInterval(() => ws.notify("notify1", {"k": ++k}), 1000);

  setTimeout(() => {
    clearInterval(intervalNotify1);
    console.log("Client has stopped generate notify");
  }, 10000);
});
ws.on("error", e => console.log("error = ", e));


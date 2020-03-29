const rpcWSC = WebSocket = require("rpc-websockets").Client
let ws = new rpcWSC("ws://localhost:4000");

ws.on("open", () => {
  ws.call("sum", [6, 4]).then(r => console.log("sum = ", r));
  ws.call("mul", [2, 3, 4]).then(r => console.log("mul = ", r));

  ws.login({login: "Admin", password: "123"})
    .then (login => {
      if (login) {
        ws.call("conc", [11, 22, 33]).then(r => console.log("conc = ", r));
      } else {
        console.log("Login error");
      }
    });
});

ws.on("error", e => console.log("error = ", e));

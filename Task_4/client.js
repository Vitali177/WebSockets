const WebSocket = require("ws");
const ws = new WebSocket("ws:/localhost:4000");

ws.on("open", () => {
  ws.on("message", message => {
    const obj = JSON.parse(message);
    console.log("Client get from server", obj);
  });

  const obj = {"x": 5, "y": 7};

  const interval = setInterval(() => {
    obj.x++;
    obj.y += 2;
    ws.send(JSON.stringify(obj));
  }, 2000);

  setTimeout(() => {
    clearInterval(interval)
    console.log("Client stopped sending messages");
  }, 10000);

  setTimeout(() => {
    ws.close();
    console.log("Client has completed his work");
  }, 20000);
});

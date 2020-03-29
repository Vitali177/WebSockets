const rpcWSS = require("rpc-websockets").Server

let server = new rpcWSS({port: 4000, host: "localhost"});

server.register("notify1", params => console.log("Server register notify1", params)).public();
server.register("notify2", params => console.log("Server register notify2", params)).public();
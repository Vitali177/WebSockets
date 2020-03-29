const rpcWSS = require("rpc-websockets").Server

const login = "Admin";
const password = "123";

let server = new rpcWSS({port: 4000, host: "localhost"});
server.setAuth((l) => (l.login === login && l.password === password));

server.register("sum", params => params[0] + params[1]).public();
server.register("mul", params => params.reduce((acc, val) => acc * val)).public();
server.register("conc", params => `${params[0]}${params[1]}${params[2]}`).protected();

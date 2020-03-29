const rpcWSS = require("rpc-websockets").Server

let server = new rpcWSS({port: 4000, host: "localhost"});

server.event("AAA");
server.event("BBB");
server.event("CCC");

process.stdin.setEncoding('utf8');
console.log("Введите название события, которое хотите сгенерировать.\nДоступные события: 'AAA', 'BBB', 'CCC'.");
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    if (chunk.indexOf("AAA") !== -1) {
      server.emit("AAA", 111);
      console.log("Вы сгенерировали событие 'AAA'");
    }
    else if (chunk.indexOf("BBB") !== -1) {
      server.emit("BBB", 222);
      console.log("Вы сгенерировали событие 'BBB'");
    }
    else if (chunk.indexOf("CCC") !== -1) {
      server.emit("CCC", 333);
      console.log("Вы сгенерировали событие 'CCC'");
    }    
  }
  process.stdin.resume();
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});

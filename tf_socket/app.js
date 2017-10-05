const http = require('http');
const fs = require('fs');
const port = 3000 || process.env.PORT;
const server = http.createServer((req, res) => {
  if (req.url=='/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
  }
  if (req.url=='/src/index.js') {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(fs.readFileSync(__dirname + '/src/index.js', 'utf-8'));
  }
});
let tmpId = "";
let mark = {
  state: "○",
  change: function () {
    if (this.state === "○") {
      this.state = "×";
    }else {
      this.state = "○";
    }
  }
};
const io = require('socket.io').listen(server);
io.on("connection", (socket) => {
  socket.on("onLoad", () => {
    console.log(socket.id);
    // socket.join();
    if (tmpId === "") {
      tmpId = socket.id;
    }else{
      console.log("1");//dbg
      // socket.set("opponentId", tmpId);
      socket.to(tmpId).json.emit("returnOnLoad", {//相手に送信
        id: socket.id,
        mark: mark.state
      });
      mark.change();
      console.log("2");//dbg
      socket.emit("returnOnLoad", {//自分に送信
        id: tmpId,
        mark: mark.state
      });
      tmpId="";
    }
  });
  socket.on("finishMyTurn", (obj) => {
    console.log("finishMyTurn");
    socket.to(obj.id).emit("turnChange", {
      i: obj.i,
      j: obj.j
    });
  });
});
server.listen(3000, () => {
  console.log(`localhost:${port}`);
});

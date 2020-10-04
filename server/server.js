express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});
// const io = socket(server);

io.on("connection", onConnection);

function onConnection(socket) {
  console.log("connection ", socket.id);
  socket.on("drawing", (data) => {
    console.log(data);
    socket.broadcast.emit("drawing", data);
  });
}

const port = 8000;
server.listen(port, () => console.log(`server is running on port ${port}`));

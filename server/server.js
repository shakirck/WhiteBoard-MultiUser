express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const fileUpload = require("express-fileupload");
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
// app.use(fileUpload());
// app.post("/upload", (req, res) => {
//   console.log(req.body);
//   if (req.files === null) {
//     return res.status(400).json({ msg: "no file uploaded" });
//   }
//   const file = req.files.file;
//   file.mv(path.join(__dirname, "../public/uploads"), (err) => {
//     if (err) console.log(err);
//   });

//   res.json({ filename: file.name, filepath: `/uploads/${file.name}` });
// });

const port = 8000;
server.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`server is running on port ${port}`);
});

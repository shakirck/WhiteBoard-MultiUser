express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const fileUpload = require("express-fileupload");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
// const io = socket(server);
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000",
}));
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

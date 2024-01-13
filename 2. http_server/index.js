const http = require("http");
const url = require("url");
const fs = require("fs");
const PORT = 3000;

const server = http.createServer(function listener(req, res) {
  const data = `${Date.now()}: New req received on ${req.url}\n`;
  const myPath = url.parse(req.url, true);
  fs.appendFile("log.txt", data, (err, data) => {
    switch (myPath.pathname) {
      case "/":
        res.end("hello we are at home page");
        break;
      case "/contact":
        const username = myPath.query.myname;
        res.end("Hello we are at contact page and here i'm " + username);
        break;
      default:
        res.end("hello we are at random page");
        break;
    }
  });
});

server.listen(PORT, function exec() {
  console.log(`Server is up at port ${PORT}`);
});

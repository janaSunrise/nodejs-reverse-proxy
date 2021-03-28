var http = require("http");
var unblocker = require("unblocker")({});

http
  .createServer(function(req, res) {
    unblocker(req, res, function(err) {
      let headers = { "content-type": "text/plain" };

      if (err) {
        res.writeHead(500, headers);
        return res.end(err.stack || err);
      }

      if (req.url == "/") {
        res.writeHead(200, headers);
        return res.end(
          "Use the format http://thissite.com/proxy/http://site-i-want.com/ to access the proxy."
        );
      } else {
        res.writeHead(404, headers);
        return res.end("Error 404: file not found.");
      }

    });
  })
  
  .listen(8080);

console.log("proxy server live at http://localhost:8080/");

var http = require("http");
var unblocker = require("unblocker")({});

// App constants
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
    unblocker(req, res, function(err) {
        let headers = { "content-type": "text/plain" };

        if (err) {
            res.writeHead(500, headers);
            return res.end(err.stack || err);
        }

        if (req.url == "/") {
            res.writeHead(200, headers);
            return res.end("Use the format http://<current-host>/proxy/http://<destination>/ to access the proxy.");
        } else {
            res.writeHead(404, headers);
            return res.end("Error 404: file not found.");
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Proxy Server running at http://${hostname}:${port}/`);
});

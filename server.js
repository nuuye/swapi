const http = require("http");
const app = require("./app");

const port = 8000;
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log("server listening on port ", port);
});

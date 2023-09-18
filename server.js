const http = require("http");
const app = require("./app")
const port = 3000;
const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 3001 });
const server = http.createServer(app);
const cors = require("cors");
const fs = require("fs");

const clients = [];
const socketEvents = new Map();
fs.readdirSync("./socket/event").forEach((eventFile) => {
  let event = require(`./socket/event/${eventFile}`);
  socketEvents.set(event.name, event.execute);
});
let socketEvents_keys = Array.from(socketEvents.keys());

wss.on("connection", (ws) => {
    clients.push(ws);
    ws.on("message", async (data) => {
        let message = JSON.parse(data.toString());
        if (socketEvents_keys.includes(message.name)) {
            let response = await socketEvents.get(message.name)(ws, message);
            clients.forEach((client) => {
                client.send(response);
            });
        }
    });
    ws.on("close", () => {});
    wss.on("error", (error) => {
        console.log(error);
      });
});

app.use(
    cors({
      origin: "*",
    })
  );

server.listen(port, () => console.log("server listening on port "+port));

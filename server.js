require('dotenv').config({ path: ".env" })
const http = require('http');
const socketio = require("socket.io");
const app = require('./app');

const server = http.createServer(app);
const io = socketio(server);
const Filter = require('bad-words')
const filter = new Filter();
let count = 0;
io.on("connection", (socket) => {

    console.log("connected to websocket");

    socket.on("chat", (mess, callback) => {
        console.log(filter.isProfane(mess));
        if (filter.isProfane(mess.text)) {
            return callback('bad words not allowed')
        } io.emit('mess', mess)

    });

    // socket.broadcast.emit("countUpdated", count);
})

server.listen(process.env.PORT, () => {
    console.log("server listening on port " + process.env.PORT);
});
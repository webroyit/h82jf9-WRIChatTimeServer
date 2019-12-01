const express = require('express');
const socktio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 8000;

const router = require('./router');

const app = express();
const server = http.createServer(app);

// instance of socket.io
const io = socktio(server);

// use it as middleware
app.use(router);

// found user that connect to this port
io.on("connection", (socket) => {
    // get the data from the client
    socket.on("join", ({ name, room }) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error){
            return error;
        }

        // put the user in the chatroom
        socket.join(user.room);

        // send a weclome message to that user
        socket.emit("message", { user: "admin", text: `Hi ${user.name}, welcome to the ${user.room} room!` });

        // send a message to all users expect that specific user
        // to() to certain chat room
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} has join!`});
    })

    // send a message to all the user in that chatroom
    socket.on("sendMessage", message => {
        const user = getUser(socket.id);

        io.to(user.room).emit("message", { user: user.name, text: message});
    });

    // user that left the chat room
    socket.on("disconnect", () => {
        // remove that user from the chatroom
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit("message", { user: "admin", text: `${user.name} has left!`});
        }
    });
})

server.listen(PORT, () => console.log("Server is running on " + PORT));
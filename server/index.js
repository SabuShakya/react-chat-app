const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

//setup socket.io
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    //on Chat room join
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if (error) return callback(error);
        console.log("back soc", socket.id);
        socket.emit('message', {
            user: 'admin',
            text: `${user.name}, Welcome to the room ${user.room}`,
            currentUserId: socket.id
        });
        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name},has joined!`,
            currentUserId: socket.id
        });

        socket.join(user.room);

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    });

    socket.on('sendMessage', (data, callback) => {
        const user = getUser(data.userId);
        io.to(user.room).emit('message', {
            user: user.name,
            text: data.message,
            currentUserId: data.userId
        });
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', {
                user: 'admin',
                text: `${user.name} has left`
            })
        }
    })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

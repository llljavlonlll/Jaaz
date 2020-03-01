const Room = require("./room");

const rooms = [];

module.exports = function(io) {
    io.on("connection", socket => {
        socket.on("join", (payload, cb) => {
            const room = rooms.find(room => {
                return room.name === payload.chatId;
            });

            if (room) {
                socket.join(payload.chatId);
                room.addUser(payload.userCategory);
                socket.broadcast
                    .to(payload.chatId)
                    .emit("roomUpdate", { room });
                cb(room);
            } else {
                socket.join(payload.chatId);
                const newRoom = new Room(payload.chatId, [
                    payload.userCategory
                ]);
                rooms.push(newRoom);
                cb(newRoom);
            }
        });

        socket.on("userMessage", (payload, cb) => {
            io.to(payload.chatId).emit("message", { message: payload.message });
            cb();
        });

        socket.on("aboutToDisconnect", payload => {
            const roomIndex = rooms.findIndex(
                room => room.name === payload.chatId
            );

            rooms[roomIndex].users = rooms[roomIndex].users.filter(
                user => user !== payload.userCategory
            );

            socket.broadcast
                .to(payload.chatId)
                .emit("roomUpdate", { room: rooms[roomIndex] });
        });

        socket.on("disconnect", () => {});
    });
};

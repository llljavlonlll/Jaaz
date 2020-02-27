module.exports = function(io) {
    io.on("connection", socket => {
        socket.on("join", payload => {
            socket.join(payload.chatId);
            socket.broadcast
                .to(payload.chatId)
                .emit("message", { message: `${socket.id} has joined` });
        });

        socket.on("userMessage", (payload, cb) => {
            io.to(payload.chatId).emit("message", { message: payload.message });
            cb();
        });

        socket.on("disconnect", () => console.log("User left"));
    });
};

require("dotenv").config();
require("./db/mongoose");

const path = require("path");
const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Setting up Socket.io
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Importing routes
const userRouter = require("./routers/api/users");
const adminUsersRouter = require("./routers/api/admin/users");
const adminQuestionsRouter = require("./routers/api/admin/questions");
const generalRouter = require("./routers/api/generals");
const questionRouter = require("./routers/api/student/questions");
const ratingRouter = require("./routers/api/student/rating");
const balanceRouter = require("./routers/api/student/balance");
const solutionRouter = require("./routers/api/instructor/solutions");
const pendingQuestionsRouter = require("./routers/api/instructor/pending");
const bookedQuestionsRouter = require("./routers/api/instructor/booked");
const completedQuestionsRouter = require("./routers/api/instructor/completed");

io.on("connection", socket => {
    console.log("We have new connection");

    socket.on("message", msg => console.log(msg));

    socket.on("disconnect", () => {
        console.log("User had left");
    });
});

// Static files directory
const questionsDir = path.join(__dirname, "..", "questions");
const solutionsDir = path.join(__dirname, "..", "solutions");
const frontEndDir = path.join(__dirname, "..", "client", "build");

app.use(cors());

// Static routers...
app.use("/images/questions", express.static(questionsDir));
app.use("/images/solutions", express.static(solutionsDir));
app.use(express.static(frontEndDir));

// Parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: 5000000 }));

// General routes
app.use("/api/", generalRouter);

// User's account routes
app.use("/api/user", userRouter);

// Admin routes
app.use("/api/admin", adminUsersRouter);
app.use("/api/admin", adminQuestionsRouter);

// Student routes
app.use("/api/question", questionRouter);
app.use("/api/rate", ratingRouter);
app.use("/api/balance", balanceRouter);

// Instructor routes
app.use("/api/solution", solutionRouter);
app.use("/api/pending", pendingQuestionsRouter);
app.use("/api/booked", bookedQuestionsRouter);
app.use("/api/completed", completedQuestionsRouter);

const port = process.env.PORT || 5001;

// Fallback to index.html
app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "..", "client", "build", "index.html")
    );
});

server.listen(port, () => {
    console.log("App is running on port: " + port);
});

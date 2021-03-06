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
require("./chat/chat")(io);

// Setting up Web-push
const webpush = require("web-push");
const publicVapid = process.env.PUBLIC_VAPID_KEY;
const privateVapid = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
    "mailto:jbutabaev@gmail.com",
    publicVapid,
    privateVapid
);

// Importing routes
const userRouter = require("./routers/api/users");
const adminUsersRouter = require("./routers/api/admin/users");
const adminQuestionsRouter = require("./routers/api/admin/questions");
const generalRouter = require("./routers/api/generals");
const questionRouter = require("./routers/api/student/questions");
const ratingRouter = require("./routers/api/student/rating");
const chatRouter = require("./routers/api/student/chat");
const balanceRouter = require("./routers/api/student/balance");
const solutionRouter = require("./routers/api/instructor/solutions");
const pendingQuestionsRouter = require("./routers/api/instructor/pending");
const bookedQuestionsRouter = require("./routers/api/instructor/booked");
const completedQuestionsRouter = require("./routers/api/instructor/completed");
const notificationsRouter = require("./routers/api/instructor/notifications");

// Static files directory
const questionsDir = path.join(__dirname, "..", "questions");
const questionsThumbnailsDir = path.join(
    __dirname,
    "..",
    "questions",
    "thumbnails"
);
const solutionsDir = path.join(__dirname, "..", "solutions");
const solutionsThumbnailsDir = path.join(
    __dirname,
    "..",
    "solutions",
    "thumbnails"
);
const frontEndDir = path.join(__dirname, "..", "client", "build");

app.use(cors());

// Static routers...
app.use("/images/questions", express.static(questionsDir));
app.use("/images/questions/thumbnails", express.static(questionsThumbnailsDir));
app.use("/images/solutions", express.static(solutionsDir));
app.use("/images/solutions/thumbnails", express.static(solutionsThumbnailsDir));
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
app.use("/api/chat", chatRouter);
app.use("/api/balance", balanceRouter);

// Instructor routes
app.use("/api/solution", solutionRouter);
app.use("/api/pending", pendingQuestionsRouter);
app.use("/api/booked", bookedQuestionsRouter);
app.use("/api/completed", completedQuestionsRouter);

// Push notification route
app.use("/api/notifications", notificationsRouter);

// Route for service worker
app.get("/sw.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "src", "sw.js"));
});

// Fallback to index.html
app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "..", "client", "build", "index.html")
    );
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
    console.log("App is running on port: " + port);
});

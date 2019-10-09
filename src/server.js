require("dotenv").config();
require("./db/mongoose");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/api/users");
const adminRouter = require("./routers/api/admin/admins");
const generalRouter = require("./routers/api/generals");
const questionRouter = require("./routers/api/student/questions");
const solutionRouter = require("./routers/api/instructor/solutions");
const pendingQuestionsRouter = require("./routers/api/instructor/questions");
const bookedQuestionsRouter = require("./routers/api/instructor/bookedQuestions");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5001;

// Static files directory
const imagesDir = path.join(__dirname, "..", "images");
const frontEndDir = path.join(__dirname, "..", "client", "build");

app.use(cors());

// Static routers
app.use(express.static(imagesDir));
app.use(express.static(frontEndDir));

// Parsers
app.use(cookieParser());
app.use(express.json());

// General routes
app.use("/api/", generalRouter);

// User's account routes
app.use("/api/user", userRouter);

// Admin routes
app.use("/api/admin", adminRouter);

// Student questions route
app.use("/api/question", questionRouter);

// Instructor routes
app.use("/api/solution", solutionRouter);
app.use("/api/pending", pendingQuestionsRouter);
app.use("/api/booked", bookedQuestionsRouter);

// Fallback to index.html
app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "..", "client", "build", "index.html")
    );
});

app.listen(port, () => {
    console.log("App is running on port: " + port);
});

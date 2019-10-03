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

// Routes
app.use("/api/", generalRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/question", questionRouter);
app.use("/api/solution", solutionRouter);

// Fallback to index.html
app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "..", "client", "build", "index.html")
    );
});

app.listen(port, () => {
    console.log("App is running on port: " + port);
});

// Connect to DB
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Connect to DB
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

module.exports = AutoIncrement;

const mongoose = require("mongoose");
const moment = require("moment");

const questionSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    image_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 255,
        minLength: 1
    },
    subject: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "In progress"
    },
    uploaded_at: {
        type: String,
        required: true,
        maxLength: 10,
        default: moment().format("DD/MM/YYYY")
    },
    solved_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = Question = mongoose.model("Question", questionSchema);

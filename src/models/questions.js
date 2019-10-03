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
    uploaded_at: {
        type: Date,
        required: true,
        default: moment()
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    solved_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    solution: [
        {
            image: {
                type: String,
                require: true
            },
            description: String,
            solved_by: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            date: {
                type: Date,
                required: true
            }
        }
    ]
});

module.exports = Question = mongoose.model("Question", questionSchema);

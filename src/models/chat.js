const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    instructor: mongoose.Schema.Types.ObjectId,
    messages: [
        {
            owner: mongoose.Schema.Types.ObjectId,
            created_at: {
                type: Date,
                default: Date.now()
            },
            text: {
                type: String,
                maxlength: 10000
            },
            attachments: [
                {
                    type: String,
                    required: true
                }
            ]
        }
    ]
});

module.exports = Chat = mongoose.model("Chat", chatSchema);

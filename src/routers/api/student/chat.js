const Question = require("../../../models/questions");
const Chat = require("../../../models/chat");
const auth = require("../../../middleware/auth");
const router = new require("express").Router();

// Create a chat
// POST /chat/:id
router.post("/:id", auth, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        // Return error if no question is found
        if (!question) {
            return res.status(404).send({ msg: "Question not found" });
        }

        // Check if the user is the owner of this question
        if (!question.owner.equals(req.user._id)) {
            return res.status(400).send({
                msg: "You do not have rights to create chat for this question"
            });
        }

        // Check if this question already has a chat object
        if (question.chat) {
            return res.status(400).send({
                msg: "This question already has chat object created"
            });
        }

        // Create a new chat
        const chat = new Chat({
            owner: req.user._id,
            instructor: question.solution[0].solved_by
        });
        const savedChat = await chat.save();

        question.chat = savedChat._id;
        await question.save();

        // Return chat ID
        return res.send({
            chat: question.chat
        });
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

// Read chat
// GET /chat/:chatId
router.get("/:chatId", auth, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId);

        // Return error if no chat was found
        if (!chat) {
            return res.status(404).send({ msg: "Chat not found" });
        }

        // Check if user is an owner or instructor
        // of this question
        if (
            chat.owner.equals(req.user._id) ||
            chat.instructor.equals(req.user._id)
        ) {
            return res.send({ chat });
        }

        // If user is not owner nor instructor
        // return error
        return res.status(400).send({
            msg: "Permission denied"
        });
    } catch (err) {
        res.status(500).send({ msg: err.message });
    }
});

// Add message to the chat
// POST /chat/:chatId/addMessage
router.post("/:chatId/addMessage", auth, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId);

        // Return error if no chat was found
        if (!chat) {
            return res.status(404).send({ msg: "Chat not found" });
        }

        // Check if user is an owner or instructor
        // of this question
        if (
            chat.owner.equals(req.user._id) ||
            chat.instructor.equals(req.user._id)
        ) {
            chat.messages.push({
                owner: req.user._id,
                message: req.body.message
            });
            await chat.save();

            return res.send({
                newMessage: chat.messages[chat.messages.length - 1]
            });
        }

        // If user is not owner or instructor
        // return error
        return res.status(400).send({
            msg: "Permission denied"
        });
    } catch (err) {
        res.status(500).send({ msg: err.message });
    }
});

module.exports = router;

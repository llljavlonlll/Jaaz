const Question = require("../../../models/questions");
const Chat = require("../../../models/chat");
const auth = require("../../../middleware/auth");
const router = new require("express").Router();

// Create a chat
// POST /chat
router.post("/:id", auth, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).send({ msg: "Question not found" });
        }

        if (!question.owner.equals(req.user._id)) {
            return res
                .status(400)
                .send({
                    msg:
                        "You do not have rights to create chat for this question"
                });
        }

        const chat = new Chat({
            owner: req.user._id
        });
        const savedChat = await chat.save();

        question.chat = savedChat._id;
        await question.save();

        return res.send(question.chat);
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

module.exports = router;

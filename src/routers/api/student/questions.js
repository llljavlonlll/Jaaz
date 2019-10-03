const Question = require("../../../models/questions");
const auth = require("../../../middleware/auth");
const upload = require("../tools/question-uploader");
const router = new require("express").Router();
const path = require("path");

// Create a question
// POST /question/create
router.post("/create", auth, upload.single("question"), async (req, res) => {
    const question = new Question({
        ...req.body,
        owner: req.user._id,
        image_name: req.file.filename
    });

    try {
        await question.save();
        res.send(question);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get all questions of authorized user
// GET /question/
router.get("/", auth, async (req, res) => {
    try {
        // Find authorized user's questions
        const questions = await Question.find({
            owner: req.user._id
        });

        if (questions.length === 0) {
            return res.status(404).send({ msg: "No questions found" });
        }

        res.send(questions);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get authorized user's question by id
// GET /question/:id
router.get("/:id", auth, async (req, res) => {
    try {
        // Find authorized user's question by id
        const question = await Question.find({
            owner: req.user._id,
            _id: req.params.id
        });

        if (question.length === 0) {
            return res.status(404).send();
        }

        res.send(question[0]);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete authorized user's question by id
// DELETE /question/:id
router.delete("/:id", auth, async (req, res) => {
    try {
        const question = await Question.findOneAndDelete({
            owner: req.user._id,
            _id: req.params.id
        });

        if (!question) {
            return res.status(404).send();
        }

        res.send({ msg: "Question deleted" });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update authorized user's question by id
// PATCH /question/:id
router.patch("/:id", auth, async (req, res) => {
    const allowedUpdates = ["status", "description", "subject"];
    const updatesFromUser = Object.keys(req.body);

    const allowUpdate = updatesFromUser.every(update => {
        return allowedUpdates.includes(update);
    });

    if (!allowUpdate) {
        return res.status(400).send({
            msg: "Invalid updates"
        });
    }

    try {
        const question = await Question.findOneAndUpdate(
            {
                owner: req.user._id,
                _id: req.params.id
            },
            {
                ...req.body
            },
            {
                new: true
            }
        );

        if (!question) {
            return res.status(404).send();
        }

        res.send(question);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;

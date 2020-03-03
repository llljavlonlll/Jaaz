const Question = require("../../../models/questions");
const auth = require("../../../middleware/auth");
const upload = require("../tools/question-uploader");
const router = new require("express").Router();
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Create a question
// POST /question/create
router.post(
    "/create",
    auth,
    upload.single("question"),
    async (req, res) => {
        const question = new Question({
            ...req.body,
            owner: req.user._id,
            image_name: req.file.filename
        });
        const user = req.user;

        try {
            await sharp(req.file.path)
                .rotate()
                .resize({ width: 600 })
                .png({ quality: 80 })
                .jpeg({ quality: 80 })
                .toFile(
                    path.resolve(req.file.destination, "..", req.file.filename)
                );
            fs.unlinkSync(req.file.path);

            // Charge user account for the question
            if (user.balance >= 3000) {
                user.balance = user.balance - 3000;
                await user.save();
            } else {
                return res.status(400).send({ msg: "Low balance!" });
            }

            // Post question
            await question.save();

            res.send(question);
        } catch (err) {
            res.status(400).send(err.message);
        }
    },
    (err, req, res, next) => {
        res.status(400).send({ msg: err.message });
    }
);

// Get all questions of authorized user
// GET /question/
router.get("/", auth, async (req, res) => {
    try {
        // Find authorized user's questions
        const questions = await Question.find(
            {
                owner: req.user._id
            },
            null,
            { sort: { uploaded_at: -1 } }
        )
            .populate("chat")
            .exec();

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

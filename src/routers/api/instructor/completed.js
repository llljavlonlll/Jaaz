const express = require("express");
const router = new express.Router();
const auth = require("../../../middleware/auth");
const Question = require("../../../models/questions");

// Get all completed questions
// GET /api/completed/
router.get("/", auth, async (req, res) => {
    try {
        const questions = await Question.find({
            "solution.solved_by": req.user._id
        });

        if (questions.length === 0) {
            return res.status(404).send("You have not solved any question yet");
        }

        res.send(questions);
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

module.exports = router;

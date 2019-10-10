const express = require("express");
const router = new express.Router();
const auth = require("../../../middleware/auth");
const Question = require("../../../models/questions");

// Get all pending questions booked by me
// GET /api/booked
router.get("/", auth, async (req, res) => {
    try {
        const questions = await Question.find({
            booked_by: req.user._id,
            status: "Booked"
        });

        if (questions.length === 0) {
            return res.status(404).send({ msg: "No questions found!" });
        }

        res.send(questions);
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

module.exports = router;

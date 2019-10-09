const express = require("express");
const router = new express.Router();
const auth = require("../../../middleware/auth");
const Question = require("../../../models/questions");

// Book an available question
// POST /api/solution/book/:id
router.post("/book/:id", auth, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).send({ msg: "Question not found!" });
        }

        if (question.status === "Booked") {
            return res.status(400).send({ msg: "Question is already booked!" });
        }

        question.booked_by = req.user._id;
        question.status = "Booked";

        await question.save();

        res.send({ booked_by: question.booked_by });
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

// Unbook question
// POST /api/solution/unbook/:id
router.post("/unbook/:id", auth, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).send({ msg: "Question not found!" });
        }

        delete question.booked_by;
        question.status = "Pending";

        await question.save();

        res.send({ status: question.status });
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

// Add solution to the question selected by id
// POST /api/solution/:id
router.post("/:id", auth, async (req, res) => {
    const solutionEntries = ["image", "description"];
    const updates = Object.keys(req.body);

    // Check if solution has only allowed fields
    const allowSolution = updates.every(update =>
        solutionEntries.includes(update)
    );

    if (!allowSolution) {
        return res.status(400).send({ msg: "Invalid solution" });
    }

    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).send({ msg: "Question not found!" });
        }

        question.solution.push({
            ...req.body,
            solved_by: req.user._id,
            solved_at: Date.now()
        });
        question.status = "Completed";

        await question.save();

        res.send({
            status: question.status,
            solution: question.solution
        });
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

module.exports = router;

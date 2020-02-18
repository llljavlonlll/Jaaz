const express = require("express");
const Question = require("../../../models/questions");
const auth = require("../../../middleware/auth");
const isAdmin = require("../../../middleware/isAdmin");
const router = new express.Router();

// Read all questions
// GET /admin/questions
router.get("/questions", auth, isAdmin, async (req, res) => {
    try {
        const questions = await Question.find();
        res.send(questions);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Read a single question
// GET /admin/questions/:id
router.get("/questions/:id", auth, isAdmin, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        res.send(question);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Update a question
// PATCH /admin/questions/:id
router.patch("/questions/:id", auth, isAdmin, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "description",
        "subject",
        "status",
        "booked_by",
        "solved_by",
        "rejected_by",
        "solution",
        "chat"
    ];
    const isValidUpdate = updates.every(update => {
        return allowedUpdates.includes(update);
    });

    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    try {
        const question = await Question.findById(req.params.id);
        updates.forEach(update => {
            question[update] = req.body[update];
        });
        await question.save();
        res.send(question);
    } catch (e) {
        res.status(400).send();
    }
});

// Delete a question
// DELETE /admin/questions/:id
router.delete("/questions/:id", auth, isAdmin, async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        res.send(question);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;

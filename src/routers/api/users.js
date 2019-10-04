const express = require("express");
const User = require("../../models/users");
const auth = require("../../middleware/auth");
const router = new express.Router();
const upload = require("./tools/question-uploader");

// Read my account
// GET /user/me
router.get("/me", auth, async (req, res) => {
    try {
        // const user = await User.findById(req.params.id);
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Update a my account
// PATCH /user/me
router.patch("/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password"];
    const isValidUpdate = updates.every(update => {
        return allowedUpdates.includes(update);
    });

    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    try {
        const user = req.user;
        updates.forEach(update => {
            user[update] = req.body[update];
        });
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send();
    }
});

// Delete a my account
// DELETE /user/me
router.delete("/me", auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;

const express = require("express");
const User = require("../../../models/users");
const auth = require("../../../middleware/auth");
const isAdmin = require("../../../middleware/isAdmin");
const router = new express.Router();

// Read all users
// GET /admin/user
router.get("/user", auth, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Read a single user
// GET /admin/user/:id
router.get("/user/:id", auth, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Update a user
// PATCH /admin/user/:id
router.patch("/user/:id", auth, isAdmin, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email"];
    const isValidUpdate = updates.every(update => {
        return allowedUpdates.includes(update);
    });

    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    try {
        const user = await User.findById(req.params.id);
        updates.forEach(update => {
            user[update] = req.body[update];
        });
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send();
    }
});

// Delete a user
// DELETE /admin/user/:id
router.delete("/user/:id", auth, isAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(400).send("No user found");
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;

const router = require("express").Router();
const webpush = require("web-push");
const auth = require("../../../middleware/auth");
const User = require("../../../models/users");

// Subscribe to push notifications
// POST /api/subscribe
router.post("/subscribe", auth, async (req, res) => {
    const subscription = req.body;

    try {
        const user = await User.findById(req.user._id);
        user.subscription = subscription;
        await user.save();
        res.send();
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }

    // console.log(subscription);
    // const payload = JSON.stringify({ title: "test" });
    // webpush.sendNotification(subscription, payload).catch((error) => {
    //     console.error(error.stack);
    // });
});

// Testing push messages
router.post("/testMessage", async (req, res) => {
    try {
        const users = await User.find({ category: "instructor" });
        const payload = req.body.message;

        // Sending message to all subscribed users
        for (let i = 0; i < users.length; i++) {
            if (users[i].subscription) {
                // console.log("Sending notification");
                webpush
                    .sendNotification(users[i].subscription, payload)
                    .catch((error) => {
                        console.error(error.stack);
                    });
            }
        }
        res.send();
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

module.exports = router;

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

        // If subscription string is === 'null'
        // unsubscribe user
        if (!subscription.endpoint) {
            user.subscriptions = [];
            await user.save();
            return res.send({ msg: "User unsubscribed" });
        }

        user.subscriptions.push(subscription);
        await user.save();
        res.send();
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

// Testing push messages
router.post("/testMessage", async (req, res) => {
    try {
        const users = await User.find({ category: "instructor" });
        const payload = req.body.message;

        // Sending push notification with payload example

        // console.log(subscription);
        // const payload = JSON.stringify({ title: "test" });
        // webpush.sendNotification(subscription, payload).catch((error) => {
        //     console.error(error.stack);
        // });

        // Sending message to all subscribed users
        for (let i = 0; i < users.length; i++) {
            // Check if a user has any subscriptions
            if (users[i].subscriptions.length === 0) break;

            // Send push messages to each subscribed device of the user
            for (let j = 0; j < users[i].subscriptions.length; j++) {
                webpush
                    .sendNotification(users[i].subscriptions[j])
                    .catch((error) => {
                        console.log("[Push notifications]: " + error.message);
                    });
            }
        }

        res.send();
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

module.exports = router;

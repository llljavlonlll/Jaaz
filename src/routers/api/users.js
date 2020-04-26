const express = require("express");
const User = require("../../models/users");
const auth = require("../../middleware/auth");
const router = new express.Router();
const jwtDecode = require("jwt-decode");

// Test email sending with nodemailer
// GET /user/emailTest/:id
// router.get("/emailTest/:id", auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         const hash = user.activationHash;
//         const verificationUrl = `http://www.jbtrucker.com/api/user/verify/${hash}`;
//         const html = `<h1 style="background-color: purple; display: inline-block; padding: 5px;"><a style="color: white; text-decoration: none;" href=${verificationUrl}>Click here to verify your email</a></h1>`;
//         const mailOptions = {
//             from: "jbutabaev@gmail.com",
//             to: "butabaev.javlon@gmail.com", // Change to req.user.email after testing
//             subject: "Jaaz.uz | Email verification",
//             html
//         };

//         transporter
//             .sendMail(mailOptions)
//             .then(info => {
//                 return res.send({ msg: info.response });
//             })
//             .catch(err => {
//                 return res.status(400).send(err);
//             });
//     } catch (err) {
//         res.status(400).send({ msg: err.message });
//     }
// });

// Verify email
// GET /user/verify/:id
router.get("/verify/:id", async (req, res) => {
    const activationHash = req.params.id;

    try {
        const userId = await jwtDecode(activationHash)._id;

        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(400)
                .send({ msg: "Invalid link. User not found" });
        }

        user.isVerified = true;
        user.activationHash = "";
        await user.save();

        res.send({ msg: "User verified successfully" });
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

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
    const allowedUpdates = ["name", "email"];
    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    try {
        const user = req.user;
        updates.forEach((update) => {
            user[update] = req.body[update];
        });
        await user.save();
        res.send({
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
        });
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

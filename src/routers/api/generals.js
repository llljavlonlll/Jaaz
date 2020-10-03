// General routes
const User = require("../../models/users");
const auth = require("../../middleware/auth");
// const transporter = require("./tools/email-transporter");
const sgMail = require("./tools/sgMail.config");

const jwtDecode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const router = new require("express").Router();

// Schedule a free credit deposit time
// const schedule = require("node-schedule");
// var j = schedule.scheduleJob({ hour: 00, minute: 00 }, async function () {
//     await User.updateMany({ category: "customer" }, { $inc: { balance: 3 } });
// });

// Renew password
// POST /api/new_password
router.post("/new_password", async (req, res) => {
    const { password, emailVerHash } = req.body;
    const user_id = jwtDecode(emailVerHash).id;
    try {
        const user = await User.findById(user_id);

        if (emailVerHash !== user.emailVerHash) {
            return res
                .status(400)
                .send({ status: "error", msg: "Invalid or expired link" });
        }

        user.emailVerHash = "";
        user.password = password;
        await user.save();

        res.send({ status: "ok", msg: "Password updated" });
    } catch (err) {
        res.status(400).send({ status: "error", msg: err.message });
    }
});

// Reset password email
// POST /api/password_reset
router.post("/password_reset", async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                status: "error",
                msg: "Can't find that email, sorry.",
                err: "User not found",
            });
        }

        const hash = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET
        );

        // Save token for the user to user for
        // verification later when creating new password
        user.emailVerHash = hash;
        await user.save();

        // Send email with a link + token to create a new password
        const pass_reset_url = `http://www.jaaz.uz/password_reset/${hash}`;
        const mailOptions = {
            from: "no-reply@jaaz.uz",
            to: email,
            subject: "Jaaz | Password Reset",
            html: `<p>To reset your password go here: </p><br>${pass_reset_url}`,
        };

        // transporter
        //     .sendMail(mailOptions)
        sgMail
            .send(mailOptions)
            .then((info) => {
                console.log(info.response);
                res.send({
                    status: "ok",
                    msg: `Email with password reset instructions has been sent to ${email}`,
                });
            })
            .catch((err) => {
                console.log("Error sending password reset instructions");
                console.log(err);
                res.status(500).send({
                    status: "error",
                    msg: `Error sending instructions`,
                    err,
                });
            });
    } catch (err) {
        res.status(400).send({ err });
    }
});

// Create a user
// POST /api/sign-up
router.post("/sign-up", async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken("signup");

        res.cookie("token", token).status(201).send({
            name: user.name,
            email: user.email,
            category: user.category,
            balance: user.balance,
            uid: user.uid,
        });

        const hash = user.activationHash;
        const verificationUrl = `http://www.jaaz.uz/verify/${hash}`;
        const html = `<h2>Thanks for signing up for Jaaz.uz! Please click the link below to confirm your email address.</h2>
                        <br>
                        <h1 style="background-color: purple; display: inline-block; padding: 5px;">
                            <a style="color: white; text-decoration: none;" href=${verificationUrl}>
                                Click here to verify your email
                            </a>
                        </h1>
                        <br>
                        <h2>or go to:</h2>
                        <br>
                        ${verificationUrl}`;
        const mailOptions = {
            from: "no-reply@jaaz.uz",
            to: req.body.email,
            subject: "Jaaz.uz | Email verification",
            html,
        };

        // transporter
        //   .sendMail(mailOptions)
        sgMail
            .send(mailOptions)
            .then((info) => {
                console.log(info.response);
                console.log("Email sent to " + req.body.email);
            })
            .catch((err) => {
                console.log("Error sending email verification email");
                console.log(err);
                console.log("Error sending email generals.js");
            });
    } catch (err) {
        res.status(400).send({ err });
    }
});

// Login
// POST /api/login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await user.generateAuthToken("login");

        res.cookie("token", token).send({
            name: user.name,
            email: user.email,
            category: user.category,
            balance: user.balance,
            isVerified: user.isVerified,
            uid: user.uid,
            subscriptions: user.subscriptions,
        });
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
});

// Logout
// POST /api/logout
router.post("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });

        await req.user.save();

        res.send();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Logout all instances
// POST /api/logoutall
router.post("/logoutall", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Check if current token is valid
// GET /api/checkToken
router.get("/checkToken", auth, (req, res) => {
    res.send({
        isVerified: req.user.isVerified,
        balance: req.user.balance,
        name: req.user.name,
        email: req.user.email,
        category: req.user.category,
        uid: req.user.uid,
        subscriptions: req.user.subscriptions,
    });
});

module.exports = router;

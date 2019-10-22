// General routes
const User = require("../../models/users");
const auth = require("../../middleware/auth");
const nodemailer = require("nodemailer");

const router = new require("express").Router();

// Nodemailer configurations
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jbutabaev@gmail.com",
        pass: "Turkiston27b"
    }
});

// Create a user
// POST /sign-up
router.post("/sign-up", async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();

        res.cookie("token", token)
            .status(201)
            .send({
                name: user.name,
                email: user.email,
                category: user.category
            });

        const hash = user.activationHash;
        const verificationUrl = `http://www.jbtrucker.com/verify/${hash}`;
        const html = `<h2>Thanks for signing up for noCheat! Please click the link below to confirm your email address.</h2>
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
            from: "jbutabaev@gmail.com",
            to: req.body.email,
            subject: "noCheat | Email verification",
            html
        };

        transporter
            .sendMail(mailOptions)
            .then(info => {
                console.log(info.response);
            })
            .catch(err => {
                console.log(err);
            });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
// POST /login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await user.generateAuthToken();

        res.cookie("token", token).send({
            name: user.name,
            email: user.email,
            category: user.category
        });
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
});

// Logout
// POST /logout
router.post("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token;
        });

        await req.user.save();

        res.send();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Logout all instances
// POST /logoutall
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
// GET /checkToken
router.get("/checkToken", auth, (req, res) => {
    res.sendStatus(200);
});

module.exports = router;

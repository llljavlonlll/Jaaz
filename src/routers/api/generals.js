// General routes
const User = require("../../models/users");
const auth = require("../../middleware/auth");

const router = new require("express").Router();

// Create a user
// POST /sign-up
router.post("/sign-up", async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();

        res.cookie("token", token)
            .status(201)
            .send({
                email: user.email,
                token
            });
    } catch (err) {
        res.status(400).send({ err: err });
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
            email: user.email,
            token
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

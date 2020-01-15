const auth = require("../../../middleware/auth");
const router = new require("express").Router();

// Get a balance
// GET /balance
router.get("/me", auth, (req, res) => {
    res.send({ balance: req.user.balance });
});

// Add balance
// POST /balance
router.post("/me", auth, async (req, res) => {
    try {
        const user = req.user;
        user.balance = user.balance + parseInt(req.body.amount);
        await user.save();

        res.send({ balance: user.balance });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;

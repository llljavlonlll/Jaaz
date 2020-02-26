const Question = require("../../../models/questions");
const auth = require("../../../middleware/auth");
const router = new require("express").Router();

// Rate a solution
// POST /rate/:id
router.post("/:id", auth, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).send({ msg: "Question not found" });
        }

        if (!question.owner.equals(req.user._id)) {
            return res
                .status(400)
                .send({ msg: "You do not have rights to rate this question" });
        }

        question.solution[0].rating = req.body.rating;
        await question.save();

        return res.send(question.solution[0]);
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

module.exports = router;

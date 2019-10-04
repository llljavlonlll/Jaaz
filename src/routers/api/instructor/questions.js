const express = require("express");
const router = new express.Router();
const auth = require("../../../middleware/auth");
const Question = require("../../../models/questions");

// Get all available questions
// GET /api/pending
// Query Params: subject=English uploaded_at=asc
router.get("/", auth, async (req, res) => {
    const uploaded_at = req.query.uploaded_at;
    const subject = req.query.subject;

    const query = {
        status: "Pending"
    };

    let uploadedAtAscDesc = 1;

    // Programmatically set sorting value depending on query param
    if (uploaded_at === "asc") {
        uploadedAtAscDesc = 1;
    } else if (uploaded_at === "desc") {
        uploadedAtAscDesc = -1;
    }

    // Programmatically set query object depending on query param
    if (subject) {
        query.subject = subject;
    }

    try {
        const questions = await Question.find(query, null, {
            sort: { uploaded_at: uploadedAtAscDesc || 1 }
        });

        if (questions.length === 0) {
            return res
                .status(404)
                .send({ msg: "Currently, there are no available questions" });
        }
        res.send(questions);
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

module.exports = router;

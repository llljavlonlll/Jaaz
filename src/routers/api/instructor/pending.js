const express = require("express");
const router = new express.Router();
const auth = require("../../../middleware/auth");
const Question = require("../../../models/questions");

// Get all pending questions
// GET /api/pending
// Query Params: subject=English uploaded_at=asc
router.get("/", auth, async (req, res) => {
    const uploaded_at = req.query.uploaded_at;
    const subject = req.query.subject;

    const query = {
        status: "Pending",
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
            // sort: { uploaded_at: uploadedAtAscDesc || 1 },
            sort: { uploaded_at: -1 },
        });

        // if (questions.length === 0) {
        //     return res
        //         .status(404)
        //         .send({ msg: "Currently, there are no available questions" });
        // }
        res.send(questions);
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

//Get a number of question in each subject
// GET /api/pending/count
router.get("/count", auth, async (req, res) => {
    const countQuestionsPerSubject = (questions) => {
        const countObj = {};
        for (const question of questions) {
            countObj[question.subject] = 0;
        }
        for (const question of questions) {
            countObj[question.subject] += 1;
        }

        return countObj;
    };

    try {
        const questions = await Question.find({ status: "Pending" });
        const subjectCount = countQuestionsPerSubject(questions);
        res.send(subjectCount);
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

// Get pending question by id
// GET /api/pending/:id
router.get("/:id", auth, async (req, res) => {
    try {
        const question = await Question.findOne({
            _id: req.params.id,
        });

        if (!question) {
            return res.status(404).send({ msg: "Question not found!" });
        }

        res.send(question);
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
});

module.exports = router;

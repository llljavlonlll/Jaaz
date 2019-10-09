import { LOAD_QUESTIONS, ADD_QUESTION } from "./types";

export const loadQuestions = (questions = []) => ({
    type: LOAD_QUESTIONS,
    questions
});

export const addQuestion = question => ({
    type: ADD_QUESTION,
    question
});

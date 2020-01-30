import { LOAD_QUESTIONS, ADD_QUESTION, FILTER_QUESTIONS } from "./types";

export const loadQuestions = (questions = []) => ({
    type: LOAD_QUESTIONS,
    questions
});

export const addQuestion = question => ({
    type: ADD_QUESTION,
    question
});

export const filterQuestions = subject => ({
    type: FILTER_QUESTIONS,
    payload: subject
});

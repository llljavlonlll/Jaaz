import {
    LOAD_QUESTIONS,
    ADD_QUESTION,
    USER_LOGOUT,
    FILTER_QUESTIONS
} from "../actions/types";

const initialState = {
    questions: [],
    filteredQuestions: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_QUESTIONS:
            return {
                ...state,
                questions: [...action.questions],
                filteredQuestions: [...action.questions]
            };
        case ADD_QUESTION:
            return {
                ...state,
                questions: [action.question, ...state.questions]
            };
        case FILTER_QUESTIONS:
            const filteredQuestions = state.questions.filter(
                question =>
                    question.subject.toLowerCase() ===
                    action.payload.toLowerCase()
            );
            return {
                ...state,
                filteredQuestions
            };
        case USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

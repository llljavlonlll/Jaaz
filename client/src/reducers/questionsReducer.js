import { LOAD_QUESTIONS, ADD_QUESTION, USER_LOGOUT } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_QUESTIONS:
            return [...action.questions];
        case ADD_QUESTION:
            return [...state, action.question];
        case USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

import { SET_SELECTED_SUBJECT } from "../actions/types";

const initialState = {
    subject: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_SUBJECT:
            return {
                subject: action.payload.subject
            };
        default:
            return state;
    }
};

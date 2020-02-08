import { SET_LOCALE } from "../actions/types";

const initialState = {
    lang: "en"
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCALE:
            return {
                lang: action.lang
            };
        default:
            return state;
    }
};

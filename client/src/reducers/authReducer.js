import { LOGIN_SUCCESS, USER_LOADED, USER_LOADING } from "../actions/types";

const initialState = {
    isAuthorized: false,
    isLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                isAuthorized: true,
                isLoading: false
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false
            };
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
};

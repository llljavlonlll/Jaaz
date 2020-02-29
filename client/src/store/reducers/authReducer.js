import {
    LOGIN_SUCCESS,
    USER_LOADED,
    USER_LOGOUT,
    UPDATE_BALANCE,
    UPDATE_USER_EMAIL,
    UPDATE_USER_NAME,
    LOAD_USER
} from "../actions/types";

let initialState = {
    isAuthorized: false,
    isLoading: false,
    userData: {
        name: "",
        email: "",
        category: "",
        balance: 0,
        uid: null,
        isVerified: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthorized: true,
                isLoading: false,
                userData: action.userData
            };
        case LOAD_USER:
            return {
                ...state,
                userData: action.payload
            };
        case UPDATE_USER_NAME:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    name: action.payload
                }
            };

        case UPDATE_USER_EMAIL:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    email: action.payload
                }
            };

        case USER_LOADED:
            return {
                ...state,
                isLoading: false
            };
        case USER_LOGOUT:
            return {
                isAuthorized: false,
                isLoading: false,
                userData: {
                    name: "",
                    email: "",
                    category: "",
                    balance: 0
                }
            };
        case UPDATE_BALANCE:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    balance: action.payload.balance
                }
            };
        default:
            return state;
    }
};

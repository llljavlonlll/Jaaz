import { LOGIN_SUCCESS, USER_LOADED, USER_LOGOUT } from "../actions/types";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

let initialState = {
    isAuthorized: false,
    isLoading: false,
    userData: {
        name: "",
        email: "",
        category: ""
    }
};

if (Cookies.get("token")) {
    const decoded = jwtDecode(Cookies.get("token"));
    initialState = {
        ...initialState,
        isAuthorized: true,
        userData: decoded.user
    };
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthorized: true,
                isLoading: false,
                userData: action.userData
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
                    category: ""
                }
            };
        default:
            return state;
    }
};

import {
    LOGIN_SUCCESS,
    USER_LOADED,
    USER_LOGOUT,
    UPDATE_BALANCE,
    UPDATE_USER_EMAIL,
    UPDATE_USER_NAME,
    LOAD_USER,
} from "./types";
import Axios from "axios";
import Cookies from "js-cookie";

export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    userData,
});

export const checkIfLoggedIn = () => {
    return (dispatch) => {
        const token = Cookies.get("token");

        if (token) {
            return Axios.get("/api/checkToken")
                .then((res) => dispatch(loginSuccess(res.data)))
                .catch((err) => Cookies.remove("token"));
        }
    };
};

export const loadUser = () => {
    return async (dispatch) => {
        const response = await Axios.get("/api/user/me");
        dispatch({
            type: LOAD_USER,
            payload: {
                name: response.data.name,
                email: response.data.email,
                category: response.data.category,
                balance: response.data.balance,
                uid: response.data.uid,
                subscriptions: response.data.subscriptions,
                isVerified: response.data.isVerified
            },
        });
    };
};

export const updateUserName = (name) => ({
    type: UPDATE_USER_NAME,
    payload: name,
});

export const updateUserEmail = (email) => ({
    type: UPDATE_USER_EMAIL,
    payload: email,
});

export const userLoaded = () => ({
    type: USER_LOADED,
});

export const userLogout = () => ({
    type: USER_LOGOUT,
});

export const updateBalance = (balance) => ({
    type: UPDATE_BALANCE,
    payload: {
        balance,
    },
});

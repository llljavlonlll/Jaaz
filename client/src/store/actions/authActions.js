import {
    LOGIN_SUCCESS,
    USER_LOADED,
    USER_LOGOUT,
    UPDATE_BALANCE
} from "./types";

export const loginSuccess = userData => ({
    type: LOGIN_SUCCESS,
    userData
});

export const userLoaded = () => ({
    type: USER_LOADED
});

export const userLogout = () => ({
    type: USER_LOGOUT
});

export const updateBalance = balance => ({
    type: UPDATE_BALANCE,
    payload: {
        balance
    }
});

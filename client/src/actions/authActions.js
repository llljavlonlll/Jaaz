import { LOGIN_SUCCESS, USER_LOADING, USER_LOADED, USER_LOGOUT } from "./types";

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

export const userLoaded = () => ({
    type: USER_LOADED
});

export const userLoading = () => ({
    type: USER_LOADING
});

export const userLogout = () => ({
    type: USER_LOGOUT
});

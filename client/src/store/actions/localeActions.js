import { SET_LOCALE } from "./types";

export const setLocale = lang => dispatch => {
    localStorage.language = lang;
    dispatch({
        type: SET_LOCALE,
        lang
    });
};

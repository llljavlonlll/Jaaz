import { SET_SELECTED_SUBJECT } from "./types";

export const setSelectedSubject = subject => ({
    type: SET_SELECTED_SUBJECT,
    payload: {
        subject
    }
});

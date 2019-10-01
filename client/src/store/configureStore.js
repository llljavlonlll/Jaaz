import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import questionsReducer from "../reducers/questionsReducer";
import { USER_LOGOUT } from "../actions/types";

const appReducer = combineReducers({
    auth: authReducer,
    questions: questionsReducer
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default () => {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};

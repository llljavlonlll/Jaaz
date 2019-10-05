import { createStore, combineReducers } from "redux";
import { reducer as burgerMenu } from "redux-burger-menu";
import authReducer from "../reducers/authReducer";
import questionsReducer from "../reducers/questionsReducer";
import { USER_LOGOUT } from "../actions/types";

const appReducer = combineReducers({
    auth: authReducer,
    questions: questionsReducer,
    burgerMenu
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

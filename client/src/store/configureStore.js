import { createStore, combineReducers } from "redux";
import { reducer as burgerMenu } from "redux-burger-menu";
import authReducer from "../reducers/authReducer";
import questionsReducer from "../reducers/questionsReducer";

const appReducer = combineReducers({
    auth: authReducer,
    questions: questionsReducer,
    burgerMenu
});

export default () => {
    const store = createStore(
        appReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};

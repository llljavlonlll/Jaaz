import { createStore, combineReducers } from "redux";
import { reducer as burgerMenu } from "redux-burger-menu";
import authReducer from "./reducers/authReducer";
import questionsReducer from "./reducers/questionsReducer";
import instructorReducer from "./reducers/instructorReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    questions: questionsReducer,
    instructor: instructorReducer,
    burgerMenu
});

export default () => {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};

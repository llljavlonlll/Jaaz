import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducer as burgerMenu } from "redux-burger-menu";
import thunk from "redux-thunk";

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
        compose(
            applyMiddleware(thunk)
            // window.__REDUX_DEVTOOLS_EXTENSION__ &&
            //     window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

    return store;
};

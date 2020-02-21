import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as burgerMenu } from "redux-burger-menu";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import questionsReducer from "./reducers/questionsReducer";
import instructorReducer from "./reducers/instructorReducer";
import adminQuestionsReducer from "./reducers/adminQuestionsReducer";
import adminUsersReducer from "./reducers/adminUsersReducer";
import locale from "./reducers/localeReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    questions: questionsReducer,
    instructor: instructorReducer,
    adminQuestions: adminQuestionsReducer,
    adminUsers: adminUsersReducer,
    locale,
    burgerMenu
});

export default () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );

    return store;
};

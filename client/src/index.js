import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import App from "./App";
import { setLocale } from "./store/actions/localeActions";

const store = configureStore();

if (localStorage.language) {
    store.dispatch(setLocale(localStorage.language));
}

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

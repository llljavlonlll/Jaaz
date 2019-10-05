import React, { Component } from "react";

// React Router implementation
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux implementation
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { loginSuccess } from "./actions/authActions";

// CSS
import "normalize.css/normalize.css";
import "./App.css";

// Components
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import MyProfilePage from "./components/MyProfilePage";
import SignUpPage from "./components/SignUpPage";
import DashboardPage from "./components/DashboardPage";
import QuestionPage from "./components/QuestionPage";
import NotFound from "./components/NotFound";
import NavBar from "./components/MobileMenu";

// Cookies
import Cookies from "js-cookie";

const store = configureStore();

class App extends Component {
    componentDidMount() {
        if (Cookies.get("token")) {
            store.dispatch(loginSuccess());
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <NavBar />
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={DashboardPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/signup" component={SignUpPage} />
                            <Route path="/profile" component={MyProfilePage} />
                            <Route
                                path="/question/:id"
                                component={QuestionPage}
                            />
                            <Route path="/*" component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

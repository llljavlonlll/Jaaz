import React, { Component } from "react";

// React internationalization
import { IntlProvider } from "react-intl";
import messages from "./messages";

// React Router implementation
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

// CSS
import "normalize.css/normalize.css";
import "./App.css";

// Components
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import LoginPage from "./screens/LoginPage/LoginPage";
import MyProfilePage from "./screens/MyProfilePage/MyProfilePage";
import SignupPage from "./screens/SignupPage/SignupPage";
import StudentMainPage from "./screens/StudentMainPage/StudentMainPage";
import NotFoundPage from "./screens/NotFoundPage/NotFoundPage";
import MobileMenu from "./components/BurgerMenu/MobileMenu";
import InstructorMainPage from "./screens/InstructorMainPage/InstructorMainPage";
import InstructorQuestion from "./screens/InstructorQuestionPage/InstructorQuestionPage";
import NewPassword from "./screens/NewPasswordPage/NewPassword";
import AdminMainPage from "./screens/AdminMainPage/AdminMainPage";
import AdminQuestionPage from "./screens/AdminQuestionPage/AdminQuestionPage";

// Integrate Redux
import { connect } from "react-redux";
import VerifyEmailPage from "./screens/VerifyEmailPage/VerifyEmailPage";
import ForgotPasswordPage from "./screens/ForgotPasswordPage/ForgotPasswordPage";
// import { checkIfLoggedIn } from "./store/actions/authActions";

// Install Google Analytics
import ReactGA from "react-ga";

class App extends Component {
    componentDidMount() {
        // Remove splash screen
        document.getElementById("splash-screen").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("splash-screen").style.display = "none";
        }, 200);

        // Initialize GA
        ReactGA.initialize("UA-131112574-2");

        // Report page views to GA
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    // Simplify language locale "en-US" => "en"
    getLanguage(locale) {
        const dash_index = locale.indexOf("-");
        if (dash_index >= 0) {
            return locale.substring(0, dash_index);
        }
        return locale;
    }
    render() {
        let routes = null;

        if (this.props.category === "customer") {
            routes = (
                <Switch>
                    <Route exact path="/" component={StudentMainPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/profile" component={MyProfilePage} />
                    <Route exact path="/:id" component={StudentMainPage} />
                    {/*<Route path="/question/:id" component={QuestionPage} /> */}
                    <Route path="/verify/:id" component={VerifyEmailPage} />
                    <Route
                        exact
                        path="/password_reset"
                        component={ForgotPasswordPage}
                    />
                    <Route path="/password_reset/:id" component={NewPassword} />
                    <Route path="/*" component={NotFoundPage} />
                </Switch>
            );
        } else if (this.props.category === "instructor") {
            routes = (
                <Switch>
                    <Route exact path="/" component={InstructorMainPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/profile" component={MyProfilePage} />
                    <Route path="/:id" component={InstructorQuestion} />
                    <Route path="/verify/:id" component={VerifyEmailPage} />
                    <Route
                        exact
                        path="/password_reset"
                        component={ForgotPasswordPage}
                    />
                    <Route path="/password_reset/:id" component={NewPassword} />
                    <Route path="/*" component={NotFoundPage} />
                </Switch>
            );
        } else if (this.props.category === "admin") {
            routes = (
                <Switch>
                    <Route exact path="/" component={AdminMainPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/profile" component={MyProfilePage} />
                    {/*<Route path="/:id" component={InstructorQuestion} />
            <Route path="/verify/:id" component={VerifyEmailPage} />*/}
                    <Route
                        exact
                        path="/password_reset"
                        component={ForgotPasswordPage}
                    />
                    <Route path="/password_reset/:id" component={NewPassword} />
                    <Route path="/question/:id" component={AdminQuestionPage}/>
                    <Route path="/*" component={NotFoundPage} />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route exact path="/profile">
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/verify/:id" component={VerifyEmailPage} />
                    <Route
                        exact
                        path="/password_reset"
                        component={ForgotPasswordPage}
                    />
                    <Route path="/password_reset/:id" component={NewPassword} />
                    <Route path="/*" component={NotFoundPage} />
                </Switch>
            );
        }
        return (
            <IntlProvider
                locale={this.getLanguage(this.props.lang)}
                messages={messages[this.getLanguage(this.props.lang)]}
            >
                <Router>
                    <MobileMenu />
                    <HeaderComponent />
                    <div className="container">{routes}</div>
                </Router>
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.auth.userData.category,
        lang: state.locale.lang,
    };
};

export default connect(mapStateToProps)(App);

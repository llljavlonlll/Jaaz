import React, { Component } from "react";

// React internationalization
import { IntlProvider } from "react-intl";
import messages from "./messages";

// React Router implementation
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
import NavBar from "./components/BurgerMenu/MobileMenu";
import InstructorMainPage from "./screens/InstructorMainPage/InstructorMainPage";
import InstructorQuestion from "./screens/InstructorQuestionPage/InstructorQuestionPage";
import NewPassword from "./screens/NewPasswordPage/NewPassword";

// Integrate Redux
import { connect } from "react-redux";
import VerifyEmailPage from "./screens/VerifyEmailPage/VerifyEmailPage";
import ForgotPasswordPage from "./screens/ForgotPasswordPage/ForgotPasswordPage";
// import { checkIfLoggedIn } from "./store/actions/authActions";

class App extends Component {
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
        } else {
            routes = (
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
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
                locale={this.props.lang}
                messages={messages[this.props.lang]}
            >
                <Router>
                    <NavBar />
                    <HeaderComponent />
                    <div className="container">{routes}</div>
                </Router>
            </IntlProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        category: state.auth.userData.category,
        lang: state.locale.lang
    };
};

export default connect(mapStateToProps)(App);

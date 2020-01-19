import React, { Component } from "react";

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
import StudentPage from "./screens/StudentMainPage/StudentMainPage";
import QuestionPage from "./screens/QuestionPage/QuestionPage";
import NotFoundPage from "./screens/NotFoundPage/NotFoundPage";
import NavBar from "./components/BurgerMenu/MobileMenu";
import InstructorDashboard from "./components/Instructor/InstructorDashboardPage";
import InstructorQuestion from "./components/Instructor/InstructorQuestionPage";
// import FooterComponent from "./components/FooterComponent/FooterComponent";
import NewPassword from "./screens/NewPasswordPage/NewPassword";

// Integrate Redux
import { connect } from "react-redux";
import VerifyEmailPage from "./screens/VerifyEmailPage/VerifyEmailPage";
import ForgotPasswordPage from "./screens/ForgotPasswordPage/ForgotPasswordPage";

class App extends Component {
    render() {
        let routes = null;

        if (this.props.category === "customer") {
            routes = (
                <Switch>
                    <Route exact path="/" component={StudentPage} />
                    <Route path="/:id" component={StudentPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/profile" component={MyProfilePage} />
                    <Route path="/question/:id" component={QuestionPage} />
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
                    <Route exact path="/" component={InstructorDashboard} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/profile" component={MyProfilePage} />
                    <Route
                        path="/question/:id"
                        component={InstructorQuestion}
                    />
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
                    <Route exact path="/" component={StudentPage} />
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
            <Router>
                <NavBar />
                <HeaderComponent />
                <div className="container">{routes}</div>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        category: state.auth.userData.category
    };
};

export default connect(mapStateToProps)(App);

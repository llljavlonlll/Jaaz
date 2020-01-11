import React, { Component } from "react";

// React Router implementation
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// CSS
import "normalize.css/normalize.css";
import "./App.css";

// Components
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import MyProfilePage from "./components/MyProfilePage/MyProfilePage";
import SignUpPage from "./components/SignUpPage";
import StudentPage from "./screens/StudentPage";
import QuestionPage from "./components/Questions/QuestionPage";
import NotFound from "./components/NotFound";
import NavBar from "./components/MobileMenu";
import InstructorDashboard from "./components/Instructor/InstructorDashboardPage";
import InstructorQuestion from "./components/Instructor/InstructorQuestionPage";
import Footer from "./components/Footer";
import NewPassword from "./components/NewPassword";

// Integrate Redux
import { connect } from "react-redux";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";

class App extends Component {
    render() {
        let routes = null;

        if (this.props.category === "customer") {
            routes = (
                <Switch>
                    <Route exact path="/" component={StudentPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/profile" component={MyProfilePage} />
                    <Route path="/question/:id" component={QuestionPage} />
                    <Route path="/verify/:id" component={VerifyEmail} />
                    <Route
                        exact
                        path="/password_reset"
                        component={ForgotPassword}
                    />
                    <Route path="/password_reset/:id" component={NewPassword} />
                    <Route path="/*" component={NotFound} />
                </Switch>
            );
        } else if (this.props.category === "instructor") {
            routes = (
                <Switch>
                    <Route exact path="/" component={InstructorDashboard} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/profile" component={MyProfilePage} />
                    <Route
                        path="/question/:id"
                        component={InstructorQuestion}
                    />
                    <Route path="/verify/:id" component={VerifyEmail} />
                    <Route
                        exact
                        path="/password_reset"
                        component={ForgotPassword}
                    />
                    <Route path="/password_reset/:id" component={NewPassword} />
                    <Route path="/*" component={NotFound} />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route exact path="/" component={StudentPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/verify/:id" component={VerifyEmail} />
                    <Route
                        exact
                        path="/password_reset"
                        component={ForgotPassword}
                    />
                    <Route path="/password_reset/:id" component={NewPassword} />
                    <Route path="/*" component={NotFound} />
                </Switch>
            );
        }
        return (
            <Router>
                <NavBar />
                <Header />
                <div className="container">{routes}</div>
                <Footer />
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

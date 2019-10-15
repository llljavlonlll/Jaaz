import React, { Component } from "react";

// React Router implementation
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// CSS
import "normalize.css/normalize.css";
import "./App.css";

// Components
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import MyProfilePage from "./components/MyProfilePage";
import SignUpPage from "./components/SignUpPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import QuestionPage from "./components/Questions/QuestionPage";
import NotFound from "./components/NotFound";
import NavBar from "./components/MobileMenu";
import InstructorDashboard from "./components/Instructor/InstructorDashboardPage";
import InstructorQuestion from "./components/Instructor/InstructorQuestionPage";
import Footer from "./components/Footer";

// Integrate Redux
import { connect } from "react-redux";

class App extends Component {
    render() {
        let routes = null;

        if (this.props.category === "customer") {
            routes = (
                <Switch>
                    <Route exact path="/" component={DashboardPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/profile" component={MyProfilePage} />
                    <Route path="/question/:id" component={QuestionPage} />
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
                    <Route path="/*" component={NotFound} />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route exact path="/" component={DashboardPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/*" component={NotFound} />
                </Switch>
            );
        }
        return (
            <Router>
                <NavBar />
                <Header />
                <div className="container">{routes}</div>
                {/*<Footer />*/}
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

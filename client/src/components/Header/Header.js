import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { userLogout } from "../../store/actions/authActions";

import "./Header.css";

const Header = props => {
    let links = null;

    const handleLogout = () => {
        axios
            .post("/api/logout")
            .then(res => {
                if (res.status === 200) {
                    Cookies.remove("token");
                    if (!Cookies.get("token")) {
                        props.dispatch(userLogout());

                        props.history.push("/");
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    if (props.isAuthorized) {
        links = (
            <div className="navbar__links">
                <NavLink exact to="/" activeClassName="selected">
                    Dashboard
                </NavLink>
                <NavLink to="/profile" activeClassName="selected">
                    My Profile
                </NavLink>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    } else {
        links = (
            <div className="navbar__links">
                <NavLink to="/login" activeClassName="selected">
                    Login
                </NavLink>
                <NavLink to="/signup" activeClassName="selected">
                    Sign Up
                </NavLink>
            </div>
        );
    }

    return (
        <div className="header">
            <div className="container">
                <div className="navbar">
                    <NavLink to="/" style={{ margin: 0, color: "white" }}>
                        <h3 className="navbar__title">noCheat</h3>
                    </NavLink>
                    {links}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthorized: state.auth.isAuthorized
    };
};

export default connect(mapStateToProps)(withRouter(Header));

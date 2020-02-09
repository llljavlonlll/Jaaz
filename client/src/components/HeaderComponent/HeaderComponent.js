import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";
import axios from "axios";

import { userLogout } from "../../store/actions/authActions";

import "./HeaderComponent.css";

const HeaderComponent = props => {
    const isAuthorized = useSelector(state => state.auth.isAuthorized);
    const dispatch = useDispatch();

    const handleLogout = () => {
        axios
            .post("/api/logout")
            .then(res => {
                if (res.status === 200) {
                    Cookies.remove("token");
                    if (!Cookies.get("token")) {
                        dispatch(userLogout());

                        props.history.push("/");
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    let links = null;

    if (isAuthorized) {
        links = (
            <div className="navbar__links">
                <NavLink exact to="/" activeClassName="selected">
                    <FormattedMessage
                        id="nav.dash"
                        defaultMessage="Dashboard"
                    />
                </NavLink>
                <NavLink to="/profile" activeClassName="selected">
                    <FormattedMessage
                        id="nav.profile"
                        defaultMessage="My profile"
                    />
                </NavLink>
                <button onClick={handleLogout}>
                    <FormattedMessage
                        id="nav.logout"
                        defaultMessage="Log out"
                    />
                </button>
            </div>
        );
    } else {
        links = (
            <div className="navbar__links">
                <NavLink to="/login" activeClassName="selected">
                    <FormattedMessage id="nav.login" defaultMessage="Log in" />
                </NavLink>
                <NavLink to="/signup" activeClassName="selected">
                    <FormattedMessage
                        id="nav.signup"
                        defaultMessage="Sign Up"
                    />
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

export default withRouter(HeaderComponent);

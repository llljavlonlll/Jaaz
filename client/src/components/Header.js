import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { userLogout } from "../actions/authActions";

const Header = props => {
    let links = null;

    const handleLogout = () => {
        axios
            .post("api/logout")
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
                <Link to="/">Dashboard</Link>
                <Link to="/profile">My Profile</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    } else {
        links = (
            <div className="navbar__links">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        );
    }

    return (
        <div className="header">
            <div className="container">
                <div className="navbar">
                    <Link to="/" style={{ margin: 0, color: "white" }}>
                        <h3 className="navbar__title">noCheat</h3>
                    </Link>
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

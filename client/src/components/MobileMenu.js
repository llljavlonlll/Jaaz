import React, { Component } from "react";
import Menu from "./Menu";
import { action as toggleMenu } from "redux-burger-menu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { userLogout } from "../actions/authActions";
import { withRouter } from "react-router-dom";

class NavBar extends Component {
    handleMenuClose = () => {
        this.props.dispatch(toggleMenu(false));
    };

    handleLogout = () => {
        axios
            .post("/api/logout")
            .then(res => {
                if (res.status === 200) {
                    Cookies.remove("token");
                    if (!Cookies.get("token")) {
                        this.props.dispatch(userLogout());

                        this.props.history.push("/");
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
        this.props.dispatch(toggleMenu(false));
    };

    render() {
        var styles = {
            bmBurgerButton: {
                position: "absolute",
                width: "36px",
                height: "30px",
                left: "85%",
                top: "22px"
            },
            bmBurgerBars: {
                background: "#a5afd7"
            },
            bmBurgerBarsHover: {
                background: "#a90000"
            },
            bmCrossButton: {
                height: "36px",
                width: "36px"
            },
            bmCross: {
                background: "#bdc3c7"
            },
            bmMenuWrap: {
                position: "fixed",
                height: "100%",
                width: "100%"
            },
            bmMenu: {
                background: "#373a47",
                padding: "0",
                fontSize: "1.15em",
                overflow: "none"
            },
            bmMorphShape: {
                fill: "#373a47"
            },
            bmItemList: {
                color: "#b8b7ad",
                paddingTop: "2em",
                height: "100%",
                textAlign: "center"
            },
            bmItem: {
                display: "block",
                color: "#a5afd7",
                textDecoration: "none",
                padding: "3.6rem",
                borderTop: "1px solid #8357c5",
                borderBottom: "1px solid #8357c5"
            },
            bmOverlay: {
                background: "rgba(0, 0, 0, 0.3)"
            }
        };

        let menu = null;

        if (this.props.isAuthorized) {
            menu = (
                <Menu
                    right
                    styles={styles}
                    burgerButtonClassName={"burger-menu-button"}
                >
                    <Link
                        to="/"
                        className="menu-item"
                        onClick={this.handleMenuClose}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/profile"
                        className="menu-item"
                        onClick={this.handleMenuClose}
                    >
                        My Profile
                    </Link>
                    <button
                        className="menu-item"
                        onClick={this.handleLogout}
                        style={{
                            background: "none",
                            margin: "0 auto",
                            border: "none"
                        }}
                    >
                        Logout
                    </button>
                </Menu>
            );
        } else {
            menu = (
                <Menu
                    right
                    styles={styles}
                    burgerButtonClassName={"burger-menu-button"}
                >
                    <Link
                        to="/login"
                        className="menu-item"
                        onClick={this.handleMenuClose}
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="menu-item"
                        onClick={this.handleMenuClose}
                    >
                        Sign Up
                    </Link>
                </Menu>
            );
        }

        return menu;
    }
}

const mapStateToProps = state => {
    return {
        isAuthorized: state.auth.isAuthorized
    };
};

export default connect(mapStateToProps)(withRouter(NavBar));

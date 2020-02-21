import Cookies from "js-cookie";
import axios from "axios";

import React, { Component } from "react";
import { action as toggleMenu } from "redux-burger-menu";
import { withRouter } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Menu from "./Menu";
import { userLogout } from "../../store/actions/authActions";
import ModalComponent from "../ModalComponent/ModalComponent";

class NavBar extends Component {
    state = {
        modalOpen: false
    };

    closeModal = () => {
        this.setState({
            modalOpen: false
        });
    };
    handleMenuClose = () => {
        this.props.dispatch(toggleMenu(false));
    };

    handleLogout = () => {
        axios
            .post("/api/logout")
            .then(res => {
                if (res.status === 200) {
                    this.setState({ modalOpen: false });
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
                        <FormattedMessage
                            id="nav.dash"
                            defaultMessage="Dashboard"
                        />
                    </Link>
                    <Link
                        to="/profile"
                        className="menu-item"
                        onClick={this.handleMenuClose}
                    >
                        <FormattedMessage
                            id="nav.profile"
                            defaultMessage="My profile"
                        />
                    </Link>
                    <button
                        className="menu-item"
                        onClick={() => {
                            this.setState({ modalOpen: true });
                            this.props.dispatch(toggleMenu(false));
                        }}
                        style={{
                            background: "none",
                            margin: "0 auto",
                            border: "none"
                        }}
                    >
                        <FormattedMessage
                            id="nav.logout"
                            defaultMessage="Log out"
                        />
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
                        <FormattedMessage
                            id="nav.login"
                            defaultMessage="Log in"
                        />
                    </Link>
                    <Link
                        to="/signup"
                        className="menu-item"
                        onClick={this.handleMenuClose}
                    >
                        <FormattedMessage
                            id="nav.signup"
                            defaultMessage="Sign Up"
                        />
                    </Link>
                </Menu>
            );
        }

        return (
            <React.Fragment>
                {menu}
                <ModalComponent
                    isOpen={this.state.modalOpen}
                    closeModal={() => this.closeModal()}
                    acceptAction={this.handleLogout}
                    acceptTitle={this.props.intl.formatMessage({
                        id: "modal.logout",
                        defaultMessage: "Log out"
                    })}
                    rejectTitle={this.props.intl.formatMessage({
                        id: "modal.cancel",
                        defaultMessage: "Cancel"
                    })}
                    redStyle={true}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthorized: state.auth.isAuthorized
    };
};

export default connect(mapStateToProps)(withRouter(injectIntl(NavBar)));

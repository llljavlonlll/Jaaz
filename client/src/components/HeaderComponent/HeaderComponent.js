import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { MdAccountBox, MdExitToApp, MdDashboard } from "react-icons/md";

import { userLogout } from "../../store/actions/authActions";
import ModalComponent from "../ModalComponent/ModalComponent";

import "./HeaderComponent.css";

const HeaderComponent = props => {
    const [modalOpen, setModalOpen] = useState(false);
    const isAuthorized = useSelector(state => state.auth.isAuthorized);

    const dispatch = useDispatch();
    const intl = useIntl();

    const handleLogout = () => {
        axios
            .post("/api/logout")
            .then(res => {
                if (res.status === 200) {
                    setModalOpen(false);
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
                    <div className="navbar__links__item">
                        <IconContext.Provider
                            value={{
                                style: {
                                    display: "inline"
                                },
                                size: "1.1em",
                                className: "global-class-name"
                            }}
                        >
                            <div style={{ display: "inline" }}>
                                <MdDashboard />
                            </div>
                        </IconContext.Provider>
                        <span style={{ marginLeft: "0.2rem" }}>
                            <FormattedMessage
                                id="nav.dash"
                                defaultMessage="Dashboard"
                            />
                        </span>
                    </div>
                </NavLink>
                <NavLink to="/profile" activeClassName="selected">
                    <div className="navbar__links__item">
                        <IconContext.Provider
                            value={{
                                style: {
                                    display: "inline"
                                },
                                size: "1.1em",
                                className: "global-class-name"
                            }}
                        >
                            <div style={{ display: "inline" }}>
                                <MdAccountBox />
                            </div>
                        </IconContext.Provider>
                        <span style={{ marginLeft: "0.2rem" }}>
                            <FormattedMessage
                                id="nav.profile"
                                defaultMessage="My profile"
                            />
                        </span>
                    </div>
                </NavLink>
                <button
                    onClick={() => setModalOpen(true)}
                    style={{ color: "rgb(200, 120, 120)" }}
                >
                    <div className="navbar__links__item">
                        <IconContext.Provider
                            value={{
                                style: {
                                    display: "inline"
                                },
                                size: "1.1em",
                                className: "global-class-name"
                            }}
                        >
                            <div style={{ display: "inline" }}>
                                <MdExitToApp />
                            </div>
                        </IconContext.Provider>
                        <span style={{ marginLeft: "0.2rem" }}>
                            <FormattedMessage
                                id="nav.logout"
                                defaultMessage="Log out"
                            />
                        </span>
                    </div>
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
                    <NavLink
                        to="/"
                        style={{
                            margin: 0,
                            color: "white"
                        }}
                    >
                        <h3 className="navbar__title">
                            Jaaz{" "}
                            <span className="navbar__title__slogan">
                                <FormattedMessage
                                    id="nav.slogan"
                                    defaultMessage="Student and teachers portal"
                                />
                            </span>
                        </h3>
                    </NavLink>
                    {links}
                    <ModalComponent
                        isOpen={modalOpen}
                        closeModal={() => setModalOpen(false)}
                        acceptAction={handleLogout}
                        acceptTitle={intl.formatMessage({
                            id: "modal.logout",
                            defaultMessage: "Log out"
                        })}
                        rejectTitle={intl.formatMessage({
                            id: "modal.cancel",
                            defaultMessage: "Cancel"
                        })}
                        redStyle={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default withRouter(HeaderComponent);

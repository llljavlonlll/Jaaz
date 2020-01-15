import React, { Component } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import "./ForgotPasswordPage.css";

export default class ForgotPasswordPage extends Component {
    state = {
        email: "",
        sendLoading: false,
        sent: false,
        error: undefined
    };

    onChange = event => {
        const email = event.target.value;
        this.setState({
            email
        });
    };

    onSubmit = event => {
        event.preventDefault();
        this.setState({
            sendLoading: true,
            error: undefined
        });
        axios
            .post("/api/password_reset", { email: this.state.email })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        sent: true
                    });
                }
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.msg,
                    sendLoading: false
                });
            });
    };

    returnToLogin = event => {
        event.preventDefault();
        this.props.history.push("/");
    };

    render() {
        return (
            <div className="password-reset-box">
                <h3 className="password-reset-box__title">
                    Reset your password
                </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="password-reset-box__container">
                        {this.state.error && (
                            <div className="login-error">
                                <p>{this.state.error}</p>
                            </div>
                        )}
                        <div className="login-component__form__item">
                            {!this.state.sent ? (
                                <React.Fragment>
                                    <label
                                        htmlFor="email"
                                        style={{ marginBottom: "2rem" }}
                                    >
                                        Enter your email address and we will
                                        send you a link to reset your password.
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. john.doe@example.com"
                                        id="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </React.Fragment>
                            ) : (
                                <label style={{ marginBottom: "2rem" }}>
                                    Check your email for a link to reset your
                                    password. If it doesn’t appear within a few
                                    minutes, check your spam folder.
                                </label>
                            )}
                        </div>
                        {!this.state.sent ? (
                            <button>
                                {this.state.sendLoading ? (
                                    <ReactLoading
                                        color={"white"}
                                        type={"spin"}
                                        height={"4%"}
                                        width={"4%"}
                                        className="spinner"
                                    />
                                ) : (
                                    "Send password reset email"
                                )}
                            </button>
                        ) : (
                            <button onClick={this.returnToLogin}>
                                Return to login
                            </button>
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

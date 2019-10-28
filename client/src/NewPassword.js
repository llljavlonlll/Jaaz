import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import ReactLoading from "react-loading";

export default class NewPassword extends Component {
    state = {
        password: "",
        rePassword: "",
        error: undefined,
        sendingUpdate: false,
        updated: false,
        email: "",
        isLoading: false
    };

    componentDidMount() {
        try {
            const email = jwtDecode(this.props.match.params.id).email;
            this.setState({
                email
            });
        } catch (err) {
            this.setState({
                error: "Invalid password reset link"
            });
        }
    }

    onSubmit = event => {
        event.preventDefault();

        this.setState({
            sendingUpdate: true,
            isLoading: true
        });

        axios
            .post("/api/new_password", {
                password: this.state.password,
                emailVerHash: this.props.match.params.id
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        updated: true,
                        error: undefined
                    });
                }
            })
            .catch(err => {
                this.setState({
                    sendingUpdate: false,
                    error: err.response.data.msg,
                    isLoading: false
                });
            });
    };

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onRePasswordChange = event => {
        this.setState({
            rePassword: event.target.value
        });
        if (event.target.value !== this.state.password) {
            this.setState({
                error: "Passwords do not match"
            });
        } else
            this.setState({
                error: undefined
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
                    Reset password for {this.state.email}
                </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="password-reset-box__container">
                        {this.state.error && (
                            <div className="login-error">
                                <p>{this.state.error}</p>
                            </div>
                        )}
                        {this.state.updated ? (
                            <label style={{ margin: "0 auto" }}>
                                Password successfully updated!
                            </label>
                        ) : (
                            <React.Fragment>
                                <div className="login-component__form__item">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Your new password"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                    />
                                </div>
                                <div className="login-component__form__item">
                                    <label htmlFor="rePassword">
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        id="rePassword"
                                        name="rePassword"
                                        placeholder="Confirm password"
                                        onChange={this.onRePasswordChange}
                                        value={this.state.rePassword}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                        {this.state.updated ? (
                            <button
                                onClick={this.returnToLogin}
                                style={{ marginTop: "2rem" }}
                            >
                                Return to login
                            </button>
                        ) : (
                            <button>
                                {this.state.isLoading ? (
                                    <ReactLoading
                                        color={"white"}
                                        type={"spin"}
                                        height={"4%"}
                                        width={"4%"}
                                        className="spinner"
                                    />
                                ) : (
                                    "Reset password"
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { loginSuccess } from "../actions/authActions";
import ReactLoading from "react-loading";
import { api_host } from "../data/keys";

class LoginPage extends Component {
    state = {
        email: "",
        password: "",
        isLoading: false,
        error: undefined,
        remember: true
    };

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onChangeRemember = () => {
        this.setState({
            remember: !this.state.remember
        });
    };

    onSubmit = event => {
        event.preventDefault();
        this.setState({
            isLoading: true,
            error: undefined
        });

        axios
            .post("api/login", this.state)
            .then(res => {
                if (res.status === 200) {
                    this.props.dispatch(loginSuccess());
                    this.props.history.push("/");
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    error: err.response.data.err,
                    password: ""
                });
            });
    };

    render() {
        return (
            <section className="login-component">
                <h3 className="login-component__title">
                    Log in to Your Dashboard
                </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="login-component__container">
                        {this.state.error && (
                            <div className="login-error">
                                <p>{this.state.error}</p>
                            </div>
                        )}
                        <div className="login-component__form__item">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="login-component__form__item">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            <div className="password-options">
                                <p>
                                    <Link to="/">Forgot password?</Link>
                                </p>
                                {
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            name="remember"
                                            checked={this.state.remember}
                                            onChange={this.onChangeRemember}
                                        />
                                        <label htmlFor="remember">
                                            Remember me
                                        </label>
                                    </div>
                                }
                            </div>
                        </div>
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
                                "Log in"
                            )}
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default connect()(LoginPage);

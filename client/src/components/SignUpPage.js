import React, { Component } from "react";
import axios from "axios";
import { loginSuccess } from "../actions/authActions";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

class SignUpPage extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        category: "customer",
        isLoading: false,
        error: undefined
    };

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        this.setState({
            isLoading: true,
            error: undefined
        });
        axios
            .post(`/api/sign-up`, this.state)
            .then(res => {
                if (res.status === 201) {
                    this.props.dispatch(loginSuccess({ ...res.data }));
                    this.props.history.push("/");
                }
            })
            .catch(({ response }) => {
                const { err } = response.data;

                if (err.code === 11000) {
                    this.setState({
                        isLoading: false,
                        error: "Email is already in use"
                    });
                } else if (err.errors.email && err.errors.email.message) {
                    this.setState({
                        isLoading: false,
                        error: err.errors.email.message
                    });
                } else if (
                    err.errors.password &&
                    err.errors.password.kind === "minlength"
                ) {
                    this.setState({
                        isLoading: false,
                        error: "Password is too short (min 5 characters)"
                    });
                } else if (
                    err.errors.password &&
                    err.errors.password.kind === "maxlength"
                ) {
                    this.setState({
                        isLoading: false,
                        error: "Password is too long (max 255 characters)"
                    });
                }
            });
    };

    render() {
        return (
            <section className="login-component">
                <h3 className="login-component__title">Create an Account</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="login-component__container">
                        {this.state.error && (
                            <div className="login-error">
                                <p>{this.state.error}</p>
                            </div>
                        )}
                        <div className="login-component__form__item">
                            <label htmlFor="name">Full Name</label>
                            <input
                                required
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="login-component__form__item">
                            <label htmlFor="email">Email</label>
                            <input
                                required
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="login-component__form__item">
                            <label htmlFor="password">Password</label>
                            <input
                                required
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="login-component__form__item">
                            <label htmlFor="category">Account Type</label>
                            <select
                                required
                                value={this.state.category}
                                onChange={this.onChange}
                                name="category"
                                id="category"
                            >
                                <option value="customer">Customer</option>
                                <option value="instructor">Instructor</option>
                            </select>
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
                                "Sign up"
                            )}
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default connect()(SignUpPage);

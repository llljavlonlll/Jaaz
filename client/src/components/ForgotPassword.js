import React, { Component } from "react";

export default class ForgotPassword extends Component {
    state = {
        email: ""
    };

    onChange = event => {
        const email = event.target.value;
        this.setState({
            email
        });
    };
    render() {
        return (
            <div className="password-reset-box">
                <h3 className="password-reset-box__title">
                    Reset your password
                </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="password-reset-box__container">
                        <div className="login-component__form__item">
                            <label
                                htmlFor="email"
                                style={{ marginBottom: "2rem" }}
                            >
                                Enter your email address and we will send you a
                                link to reset your password.
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>
                        <button>Send password reset email</button>
                    </div>
                </form>
            </div>
        );
    }
}

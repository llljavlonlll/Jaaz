import React, { Component } from "react";
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { injectIntl } from "react-intl";

import { loginSuccess } from "../../store/actions/authActions";
import { FormattedMessage } from "react-intl";

class SignupPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    category: "customer",
    isLoading: false,
    error: undefined,
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (event.target.password.value !== event.target.rePassword.value) {
      return this.setState({
        error: "Passwords do not match",
      });
    }
    this.setState({
      isLoading: true,
      error: undefined,
    });
    axios
      .post(`/api/sign-up`, this.state)
      .then((res) => {
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
            error: "Email is already in use",
          });
        } else if (err.errors.email && err.errors.email.message) {
          this.setState({
            isLoading: false,
            error: err.errors.email.message,
          });
        } else if (
          err.errors.password &&
          err.errors.password.kind === "minlength"
        ) {
          this.setState({
            isLoading: false,
            error: "Password is too short (min 5 characters)",
          });
        } else if (
          err.errors.password &&
          err.errors.password.kind === "maxlength"
        ) {
          this.setState({
            isLoading: false,
            error: "Password is too long (max 255 characters)",
          });
        }
      });
  };

  render() {
    if (this.props.isAuthorized) {
      return <Redirect to="/" />;
    }
    return (
      <section className="login-component">
        <h3 className="login-component__title">
          <FormattedMessage
            id="signup.title"
            defaultMessage="Create an account"
          />
        </h3>
        <form onSubmit={this.onSubmit}>
          <div className="login-component__container">
            {this.state.error && (
              <div className="login-error">
                <p>{this.state.error}</p>
              </div>
            )}
            <div className="login-component__form__item">
              <label htmlFor="name">
                <FormattedMessage id="signup.name" defaultMessage="Full name" />
              </label>
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
                autoComplete="new-password"
                required
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div className="login-component__form__item">
              <label htmlFor="password">
                <label htmlFor="name">
                  <FormattedMessage
                    id="signup.pass"
                    defaultMessage="Password"
                  />
                </label>
              </label>
              <input
                autoComplete="new-password"
                required
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="login-component__form__item">
              <label htmlFor="rePassword">
                <FormattedMessage
                  id="signup.re-pass"
                  defaultMessage="Confirm password"
                />
              </label>
              <input
                required
                type="password"
                id="rePassword"
                name="rePassword"
                value={this.state.rePassword}
                onChange={this.onChange}
              />
            </div>
            {/* <div className="login-component__form__item">
                            <label htmlFor="category">
                                <FormattedMessage
                                    id="signup.acc"
                                    defaultMessage="Account type"
                                />
                            </label>
                            <select
                                required
                                value={this.state.category}
                                onChange={this.onChange}
                                name="category"
                                id="category"
                            >
                                <option value="customer">
                                    {this.props.intl.formatMessage({
                                        id: "signup.acc.student",
                                        defaultMessage: "Student"
                                    })}
                                </option>
                                <option value="instructor">
                                    {this.props.intl.formatMessage({
                                        id: "signup.acc.teacher",
                                        defaultMessage: "Teacher"
                                    })}
                                </option>
                            </select>
                        </div> */}
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
                <FormattedMessage id="signup" defaultMessage="Sign up" />
              )}
            </button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.auth.isAuthorized,
  };
};

export default connect(mapStateToProps)(injectIntl(SignupPage));

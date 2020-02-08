import React, { Component } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import { FormattedMessage } from "react-intl";

import "./VerifyEmailPage.css";

export default class VerifyEmailPage extends Component {
    state = {
        isVerified: false,
        error: undefined
    };

    componentDidMount() {
        axios
            .get(`/api/user/verify/${this.props.match.params.id}`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        isVerified: true
                    });
                }
            })
            .catch(err => {
                this.setState({
                    error: "Error verifying your email"
                });
            });
    }

    render() {
        return (
            <div className="verification-box">
                <h3 className="verification-box__title">
                    <FormattedMessage
                        id="email-verification.title"
                        defaultMessag="Email verification"
                    />
                </h3>
                <div className="verification-box__container">
                    {this.state.isVerified ? (
                        <p>
                            <FormattedMessage
                                id="email-verification.description"
                                defaultMessag="Your email has been successfully verified!"
                            />
                        </p>
                    ) : this.state.error ? (
                        <p>{this.state.error}</p>
                    ) : (
                        <ReactLoading color={"#8357c5"} type={"spin"} />
                    )}
                </div>
            </div>
        );
    }
}

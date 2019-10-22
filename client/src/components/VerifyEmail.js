import React, { Component } from "react";
import ReactLoading from "react-loading";
import axios from "axios";

export default class VerifyEmail extends Component {
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
                    error: "Error verifying you email"
                });
            });
    }

    render() {
        return (
            <div className="verification-box">
                <h3 className="verification-box__title">Email Verification</h3>
                <div className="verification-box__container">
                    {this.state.isVerified ? (
                        <p>Your email has been successfully verified!</p>
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

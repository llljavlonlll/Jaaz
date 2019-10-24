import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default class NewPassword extends Component {
    state = {
        password: "",
        rePassword: "",
        error: undefined,
        sendingUpdate: false,
        updated: false
    };

    onSubmit = event => {
        event.preventDefault();
        const user_id = jwtDecode(this.props.match.params.id).id;

        this.setState({
            sendingUpdate: true
        });

        axios
            .post("/api/new_password", {
                password: this.state.password,
                user_id
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        updated: true
                    });
                }
            })
            .catch(err => {
                this.setState({
                    sendingUpdate: false,
                    error: err.response.data.msg
                });
            });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button>Update password</button>
                </form>
            </div>
        );
    }
}

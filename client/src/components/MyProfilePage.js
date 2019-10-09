import React, { Component } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

export default class MyProfilePage extends Component {
    state = {
        name: "",
        email: "",
        account_type: "",
        isLoading: true
    };

    componentDidMount() {
        axios.get("/api/user/me").then(res => {
            if (res.status === 200) {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    account_type: res.data.category,
                    isLoading: false
                });
            } else {
                throw new Error(res.error);
            }
        });
    }

    render() {
        return (
            <div className="question-uploader">
                <h3 className="question-uploader__title">Question</h3>
                <div className="question-uploader__container">
                    {this.state.isLoading ? (
                        <ReactLoading color={"#8357c5"} type={"spin"} />
                    ) : (
                        <div>
                            <p>Name: {this.state.name}</p>
                            <p>Email: {this.state.email}</p>
                            <p>Account Type: {this.state.account_type}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

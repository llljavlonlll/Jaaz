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
            <div className="profile-box">
                <div className="profile-box__header">
                    <h3 className="profile-box__header__title">My Profile</h3>
                    <button>Edit</button>
                </div>
                <div className="profile-box__container">
                    {this.state.isLoading ? (
                        <ReactLoading color={"#8357c5"} type={"spin"} />
                    ) : (
                        <div className="profile-info">
                            <h4>Full Name</h4>
                            <div>{this.state.name}</div>
                            <h4>Email</h4>
                            <div>{this.state.email}</div>
                            <h4>Account Type</h4>
                            <div>{this.state.account_type}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

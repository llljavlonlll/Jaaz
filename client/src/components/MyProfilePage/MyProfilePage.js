import React, { Component } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import "./MyProfilePage.css";

export default class MyProfilePage extends Component {
    state = {
        name: "",
        email: "",
        account_type: "",
        balance: "",
        isVerified: true,
        isLoading: true,
        editMode: false
    };

    componentDidMount() {
        axios.get("/api/user/me").then(res => {
            if (res.status === 200) {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    account_type: res.data.category,
                    balance: res.data.balance,
                    isVerified: res.data.isVerified,
                    isLoading: false
                });
            } else {
                throw new Error(res.error);
            }
        });
    }

    inputChangeHandler = event => {
        const value = event.target.value;

        this.setState({
            [event.target.name]: value
        });
    };

    onSaveChanges = () => {
        this.setState({
            isSaving: true
        });

        axios
            .patch("/api/user/me", {
                name: this.state.name,
                email: this.state.email
            })
            .then(res => {
                this.setState({
                    isSaving: false,
                    editMode: false
                });
            })
            .catch(err => {
                console.log(err.message);
                this.setState({
                    isSaving: false,
                    editMode: false
                });
            });
    };

    render() {
        return (
            <div className="profile-box">
                <div className="profile-box__header">
                    <h3 className="profile-box__header__title">Your Profile</h3>
                    {!this.state.editMode && (
                        <button
                            onClick={() => this.setState({ editMode: true })}
                        >
                            Edit
                        </button>
                    )}
                </div>
                <div className="profile-box__container">
                    {this.state.isLoading ? (
                        <ReactLoading color={"#8357c5"} type={"spin"} />
                    ) : (
                        <div className="profile-box__content">
                            <div className="profile-box__content__field">
                                <h4>Full Name</h4>
                                {this.state.editMode ? (
                                    <input
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.inputChangeHandler}
                                        name="name"
                                    />
                                ) : (
                                    <div>{this.state.name}</div>
                                )}
                            </div>

                            <div className="profile-box__content__field">
                                <h4>
                                    Email{" "}
                                    {this.state.isVerified ? (
                                        <span
                                            style={{
                                                color: "white",
                                                fontWeight: "500",
                                                background: "green",
                                                borderRadius: "3px",
                                                padding: "0 4px"
                                            }}
                                        >
                                            verified
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                color: "white",
                                                fontWeight: "500",
                                                background: "red",
                                                borderRadius: "3px",
                                                padding: "0 4px"
                                            }}
                                        >
                                            unverified
                                        </span>
                                    )}
                                </h4>

                                {this.state.editMode ? (
                                    <input
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.inputChangeHandler}
                                        name="email"
                                    />
                                ) : (
                                    <div>{this.state.email}</div>
                                )}
                            </div>

                            <div className="profile-box__content__field">
                                <h4>Account Type</h4>
                                <div>{this.state.account_type}</div>
                            </div>

                            <div className="profile-box__content__field">
                                <h4>Balance</h4>
                                <div>{this.state.balance} NP</div>
                            </div>

                            {this.state.editMode && (
                                <div className="profile-box__content__buttons-container">
                                    <button
                                        className="button-cancel"
                                        onClick={() =>
                                            this.setState({ editMode: false })
                                        }
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="button-save"
                                        onClick={this.onSaveChanges}
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

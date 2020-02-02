import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import "./MyProfilePage.css";
import {
    updateBalance,
    updateUserName,
    updateUserEmail,
    loadUser
} from "../../store/actions/authActions";

const MyProfilePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isBuyingOrWithdrawing, setIsBuyingOrWithdrawig] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    // Fetch user data state from redux store
    const { name, email, balance, category, isVerified } = useSelector(
        state => state.auth.userData
    );

    const nameChangeHandler = event => {
        dispatch(updateUserName(event.target.value));
    };

    const emailChangeHandler = event => {
        dispatch(updateUserEmail(event.target.value));
    };

    const onSaveChanges = () => {
        setIsSaving(true);

        axios
            .patch("/api/user/me", {
                name: name,
                email: email
            })
            .then(res => {
                setIsSaving(false);
                setEditMode(false);
            })
            .catch(err => {
                console.log(err.message);
                setIsSaving(false);
                setEditMode(false);
            });
    };

    const handleBalanceAction = () => {
        setIsBuyingOrWithdrawig(true);
        axios
            .post("/api/balance/me", {
                amount: category === "customer" ? "3000" : `-${balance}`
            })
            .then(res => {
                setIsBuyingOrWithdrawig(false);
                dispatch(updateBalance(res.data.balance));
            })
            .catch(err => {
                console.log(err.message);
                setIsBuyingOrWithdrawig(false);
            });
    };

    return (
        <div className="profile-box">
            <div className="profile-box__header">
                <h3 className="profile-box__header__title">Your Profile</h3>
                {!editMode && (
                    <button onClick={() => setEditMode(true)}>Edit</button>
                )}
            </div>
            <div className="profile-box__container">
                <div className="profile-box__content">
                    <div className="profile-box__content__field">
                        <p>Full Name</p>
                        {editMode ? (
                            <input
                                type="text"
                                value={name}
                                onChange={nameChangeHandler}
                                name="name"
                            />
                        ) : (
                            <h4>
                                {isLoading ? (
                                    <ReactLoading
                                        color="#8357c5"
                                        type="spin"
                                        width={"1.8rem"}
                                        height={"1.8rem"}
                                    />
                                ) : (
                                    name
                                )}
                            </h4>
                        )}
                    </div>
                    <div className="profile-box__content__field">
                        <p>
                            Email{" "}
                            {isVerified ? (
                                <span
                                    style={{
                                        color: "white",
                                        fontWeight: "500",
                                        background: "green",
                                        borderRadius: "3px",
                                        padding: "0 4px"
                                    }}
                                    className="verification"
                                >
                                    verified
                                </span>
                            ) : (
                                <span
                                    style={{
                                        color: "white",
                                        fontWeight: "500",
                                        background: "#963f3f",
                                        borderRadius: "3px",
                                        padding: "0 4px"
                                    }}
                                    className="verification"
                                >
                                    unverified
                                </span>
                            )}
                        </p>

                        {editMode ? (
                            <input
                                type="email"
                                value={email}
                                onChange={emailChangeHandler}
                                name="email"
                            />
                        ) : (
                            <h4>
                                {isLoading ? (
                                    <ReactLoading
                                        color="#8357c5"
                                        type="spin"
                                        width={"1.8rem"}
                                        height={"1.8rem"}
                                    />
                                ) : (
                                    email
                                )}
                            </h4>
                        )}
                    </div>
                    <div className="profile-box__content__field">
                        <p>Account Type</p>
                        <h4>
                            {isLoading ? (
                                <ReactLoading
                                    color="#8357c5"
                                    type="spin"
                                    width={"1.8rem"}
                                    height={"1.8rem"}
                                />
                            ) : (
                                _.capitalize(category)
                            )}
                        </h4>
                    </div>
                    <div className="profile-box__content__field">
                        <p>Balance</p>
                        <div className="profile-box__content__field--balance">
                            <button onClick={handleBalanceAction}>
                                {isBuyingOrWithdrawing ? (
                                    <ReactLoading
                                        color="white"
                                        type="spin"
                                        width={"15%"}
                                        height={"15%"}
                                        className="spinner"
                                    />
                                ) : category === "customer" ? (
                                    "Buy credit"
                                ) : (
                                    "Withdraw"
                                )}
                            </button>
                            <h4>
                                {isLoading ? (
                                    <ReactLoading
                                        color="#8357c5"
                                        type="spin"
                                        width={"1.8rem"}
                                        height={"1.8rem"}
                                    />
                                ) : (
                                    `${balance} NP`
                                )}
                            </h4>
                        </div>
                    </div>
                    {editMode && (
                        <div className="profile-box__content__buttons-container">
                            <button
                                className="button-cancel"
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="button-save"
                                onClick={onSaveChanges}
                            >
                                {isSaving ? (
                                    <ReactLoading
                                        color="white"
                                        type={"spin"}
                                        height={"13%"}
                                        width={"13%"}
                                        className="spinner"
                                    />
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;

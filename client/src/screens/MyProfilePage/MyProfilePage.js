import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, FormattedHTMLMessage, useIntl } from "react-intl";
import { MdEdit } from "react-icons/md";
// import _ from "lodash";

import "./MyProfilePage.css";
import {
    updateBalance,
    updateUserName,
    updateUserEmail,
    loadUser,
} from "../../store/actions/authActions";
import { setLocale } from "../../store/actions/localeActions";

const MyProfilePage = () => {
    const [isLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isBuyingOrWithdrawing, setIsBuyingOrWithdrawig] = useState(false);

    const dispatch = useDispatch();
    const intl = useIntl();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    // Fetch user data state from redux store
    const { name, email, balance, category, isVerified } = useSelector(
        (state) => state.auth.userData
    );

    const nameChangeHandler = (event) => {
        dispatch(updateUserName(event.target.value));
    };

    const emailChangeHandler = (event) => {
        dispatch(updateUserEmail(event.target.value));
    };

    const onSaveChanges = () => {
        setIsSaving(true);

        axios
            .patch("/api/user/me", {
                name: name,
                email: email,
            })
            .then((res) => {
                setIsSaving(false);
                setEditMode(false);
            })
            .catch((err) => {
                console.log(err.message);
                setIsSaving(false);
                setEditMode(false);
            });
    };

    const handleBalanceAction = () => {
        setIsBuyingOrWithdrawig(true);
        axios
            .post("/api/balance/me", {
                // Add credit
                amount: 1,
            })
            .then((res) => {
                setIsBuyingOrWithdrawig(false);
                dispatch(updateBalance(res.data.balance));
            })
            .catch((err) => {
                console.log(err.message);
                setIsBuyingOrWithdrawig(false);
            });
    };

    return (
        <div className="profile-box">
            <div className="profile-box__header">
                <h3 className="profile-box__header__title">
                    <FormattedMessage
                        id="profile.title"
                        defaultMessage="Your Profile"
                    />
                </h3>
                {!editMode && (
                    <button onClick={() => setEditMode(true)}>
                        {/*<FormattedMessage
                            id="profile.edit"
                            defaultMessage="Edit"
                        />*/}
                        <MdEdit style={{ fontSize: "24px" }} />
                    </button>
                )}
            </div>
            <div className="profile-box__container">
                <div className="profile-box__content">
                    <div className="profile-box__content__field">
                        <p>
                            <FormattedMessage
                                id="profile.name"
                                defaultMessage="Full name"
                            />
                        </p>
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
                                        padding: "0 4px",
                                    }}
                                    className="verification"
                                >
                                    <FormattedMessage
                                        id="profile.email.verified"
                                        defaultMessage="verified"
                                    />
                                </span>
                            ) : (
                                <span
                                    style={{
                                        color: "white",
                                        fontWeight: "500",
                                        background: "#963f3f",
                                        borderRadius: "3px",
                                        padding: "0 4px",
                                    }}
                                    className="verification"
                                >
                                    <FormattedMessage
                                        id="profile.email.unverified"
                                        defaultMessage="unverified"
                                    />
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
                        <p>
                            <FormattedMessage
                                id="profile.acc"
                                defaultMessage="Account Type"
                            />
                        </p>
                        <h4>
                            {isLoading ? (
                                <ReactLoading
                                    color="#8357c5"
                                    type="spin"
                                    width={"1.8rem"}
                                    height={"1.8rem"}
                                />
                            ) : (
                                <FormattedHTMLMessage
                                    id="profile.acc.type"
                                    defaultMessage="{type}"
                                    values={{
                                        type: intl.formatMessage({
                                            id:
                                                category === "customer"
                                                    ? "profile.acc.student"
                                                    : "profile.acc.teacher",
                                        }),
                                    }}
                                />
                            )}
                        </h4>
                    </div>
                    <div className="profile-box__content__field">
                        <p>
                            <FormattedMessage
                                id="profile.lang"
                                defaultMessage="Language"
                            />
                        </p>
                        <div>
                            <div>
                                <span
                                    role="button"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => dispatch(setLocale("en"))}
                                >
                                    EN
                                </span>{" "}
                                <span
                                    style={{
                                        margin: "0 1rem",
                                        userSelect: "none",
                                    }}
                                >
                                    |
                                </span>
                                <span
                                    role="button"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => dispatch(setLocale("ru"))}
                                >
                                    РУ
                                </span>{" "}
                                <span
                                    style={{
                                        margin: "0 1rem",
                                        userSelect: "none",
                                    }}
                                >
                                    |
                                </span>
                                <span
                                    role="button"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => dispatch(setLocale("uz"))}
                                >
                                    O'Z
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-box__content__field">
                        <p>
                            <FormattedMessage
                                id="profile.balance"
                                defaultMessage="Balance"
                            />
                        </p>
                        <div className="profile-box__content__field--balance">
                            {category === "customer" && (
                                <button onClick={handleBalanceAction}>
                                    {
                                        isBuyingOrWithdrawing ? (
                                            <ReactLoading
                                                color="white"
                                                type="spin"
                                                width={"15%"}
                                                height={"15%"}
                                                className="spinner"
                                            />
                                        ) : category === "customer" ? (
                                            <FormattedMessage
                                                id="profile.button.buy"
                                                defaultMessage="Buy credit"
                                            />
                                        ) : null
                                        // ) : (
                                        //     <FormattedMessage
                                        //         id="profile.button.withdraw"
                                        //         defaultMessage="Withdraw"
                                        //     />
                                        // )
                                    }
                                </button>
                            )}
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
                                <FormattedMessage
                                    id="profile.edit.cancel"
                                    defaultMessage="Cancel"
                                />
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
                                    <FormattedMessage
                                        id="profile.edit.save"
                                        defaultMessage="Save"
                                    />
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

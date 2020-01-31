import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { connect, useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import "./MyProfilePage.css";
import {
    updateBalance,
    updateUserName,
    updateUserEmail,
    loadUser
} from "../../store/actions/authActions";

const MyProfilePage = props => {
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
                console.log("Update successful");
            })
            .catch(err => {
                console.log(err.message);
                setIsSaving(false);
                setEditMode(false);
            });
    };

    const handleBuyCredit = () => {
        setIsBuyingOrWithdrawig(true);
        axios
            .post("/api/balance/me", {
                amount: "3000"
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

    const handleWithdrawCredit = () => {
        setIsBuyingOrWithdrawig(true);
        axios
            .post("/api/balance/me", {
                amount: "-3000"
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
                            <button onClick={handleBuyCredit}>
                                {isBuyingOrWithdrawing ? (
                                    <ReactLoading
                                        color="white"
                                        type="spin"
                                        width={"15%"}
                                        height={"15%"}
                                        className="spinner"
                                    />
                                ) : (
                                    "Buy credit"
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

// class MyProfilePage extends Component {
//     state = {
//         name: "",
//         email: "",
//         account_type: "",
//         balance: "",
//         isVerified: false,
//         isLoading: true,
//         isSaving: false,
//         editMode: false,
//         isBuyingOrWithdrawing: false
//     };

//     fetchData = () => {
//         this.setState({
//             isLoading: true
//         });
//         axios.get("/api/user/me").then(res => {
//             if (res.status === 200) {
//                 this.setState({
//                     name: res.data.name,
//                     email: res.data.email,
//                     account_type: _.capitalize(res.data.category),
//                     balance: res.data.balance,
//                     isVerified: res.data.isVerified,
//                     isLoading: false
//                 });
//             } else {
//                 throw new Error(res.error);
//             }
//         });
//     };

//     componentDidMount() {
//         this.fetchData();
//     }

//     inputChangeHandler = event => {
//         const value = event.target.value;

//         this.setState({
//             [event.target.name]: value
//         });
//     };

//     onSaveChanges = () => {
//         this.setState({
//             isSaving: true
//         });

//         axios
//             .patch("/api/user/me", {
//                 name: this.state.name,
//                 email: this.state.email
//             })
//             .then(res => {
//                 this.setState({
//                     isSaving: false,
//                     editMode: false
//                 });
//             })
//             .catch(err => {
//                 console.log(err.message);
//                 this.setState({
//                     isSaving: false,
//                     editMode: false
//                 });
//             });

//         this.fetchData();
//     };

//     handleBuyCredit = () => {
//         this.setState({
//             isBuyingOrWithdrawing: true
//         });
//         axios
//             .post("/api/balance/me", {
//                 amount: "3000"
//             })
//             .then(res => {
//                 this.setState({
//                     isBuyingOrWithdrawing: false,
//                     balance: res.data.balance
//                 });
//                 this.props.dispatch(updateBalance(res.data.balance));
//             })
//             .catch(err => {
//                 console.log(err.message);
//                 this.setState({
//                     isBuyingOrWithdrawing: false
//                 });
//             });
//     };

//     handleWithdrawCredit = () => {
//         this.setState({
//             isBuyingOrWithdrawing: true
//         });
//         axios
//             .post("/api/balance/me", {
//                 amount: "-3000"
//             })
//             .then(res => {
//                 this.setState({
//                     isBuyingOrWithdrawing: false,
//                     balance: res.data.balance
//                 });
//                 this.props.dispatch(updateBalance(res.data.balance));
//             })
//             .catch(err => {
//                 console.log(err.message);
//                 this.setState({
//                     isBuyingOrWithdrawing: false
//                 });
//             });
//     };

//     render() {
//         return (
//             <div className="profile-box">
//                 <div className="profile-box__header">
//                     <h3 className="profile-box__header__title">Your Profile</h3>
//                     {!this.state.editMode && (
//                         <button
//                             onClick={() => this.setState({ editMode: true })}
//                         >
//                             Edit
//                         </button>
//                     )}
//                 </div>
//                 <div className="profile-box__container">
//                     <div className="profile-box__content">
//                         <div className="profile-box__content__field">
//                             <p>Full Name</p>
//                             {this.state.editMode ? (
//                                 <input
//                                     type="text"
//                                     value={this.state.name}
//                                     onChange={this.inputChangeHandler}
//                                     name="name"
//                                 />
//                             ) : (
//                                 <h4>
//                                     {this.state.isLoading ? (
//                                         <ReactLoading
//                                             color="#8357c5"
//                                             type="spin"
//                                             width={"1.8rem"}
//                                             height={"1.8rem"}
//                                         />
//                                     ) : (
//                                         this.state.name
//                                     )}
//                                 </h4>
//                             )}
//                         </div>

//                         <div className="profile-box__content__field">
//                             <p>
//                                 Email{" "}
//                                 {this.state.isVerified ? (
//                                     <span
//                                         style={{
//                                             color: "white",
//                                             fontWeight: "500",
//                                             background: "green",
//                                             borderRadius: "3px",
//                                             padding: "0 4px"
//                                         }}
//                                         className="verification"
//                                     >
//                                         verified
//                                     </span>
//                                 ) : (
//                                     <span
//                                         style={{
//                                             color: "white",
//                                             fontWeight: "500",
//                                             background: "#963f3f",
//                                             borderRadius: "3px",
//                                             padding: "0 4px"
//                                         }}
//                                         className="verification"
//                                     >
//                                         unverified
//                                     </span>
//                                 )}
//                             </p>

//                             {this.state.editMode ? (
//                                 <input
//                                     type="email"
//                                     value={this.state.email}
//                                     onChange={this.inputChangeHandler}
//                                     name="email"
//                                 />
//                             ) : (
//                                 <h4>
//                                     {this.state.isLoading ? (
//                                         <ReactLoading
//                                             color="#8357c5"
//                                             type="spin"
//                                             width={"1.8rem"}
//                                             height={"1.8rem"}
//                                         />
//                                     ) : (
//                                         this.state.email
//                                     )}
//                                 </h4>
//                             )}
//                         </div>

//                         <div className="profile-box__content__field">
//                             <p>Account Type</p>
//                             <h4>
//                                 {this.state.isLoading ? (
//                                     <ReactLoading
//                                         color="#8357c5"
//                                         type="spin"
//                                         width={"1.8rem"}
//                                         height={"1.8rem"}
//                                     />
//                                 ) : (
//                                     this.state.account_type
//                                 )}
//                             </h4>
//                         </div>

//                         <div className="profile-box__content__field">
//                             <p>Balance</p>
//                             <div className="profile-box__content__field--balance">
//                                 <button onClick={this.handleBuyCredit}>
//                                     {this.state.isBuyingOrWithdrawing ? (
//                                         <ReactLoading
//                                             color="white"
//                                             type="spin"
//                                             width={"15%"}
//                                             height={"15%"}
//                                             className="spinner"
//                                         />
//                                     ) : (
//                                         "Buy credit"
//                                     )}
//                                 </button>
//                                 <h4>
//                                     {this.state.isLoading ? (
//                                         <ReactLoading
//                                             color="#8357c5"
//                                             type="spin"
//                                             width={"1.8rem"}
//                                             height={"1.8rem"}
//                                         />
//                                     ) : (
//                                         `${this.state.balance} NP`
//                                     )}
//                                 </h4>
//                             </div>
//                         </div>

//                         {this.state.editMode && (
//                             <div className="profile-box__content__buttons-container">
//                                 <button
//                                     className="button-cancel"
//                                     onClick={() =>
//                                         this.setState({ editMode: false })
//                                     }
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="button-save"
//                                     onClick={this.onSaveChanges}
//                                 >
//                                     {this.state.isSaving ? (
//                                         <ReactLoading
//                                             color="white"
//                                             type={"spin"}
//                                             height={"13%"}
//                                             width={"13%"}
//                                             className="spinner"
//                                         />
//                                     ) : (
//                                         "Save"
//                                     )}
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default connect()(MyProfilePage);

export default MyProfilePage;

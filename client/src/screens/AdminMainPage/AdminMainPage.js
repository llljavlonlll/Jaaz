import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdQuestionAnswer } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

import QuestionTileComponent from "../../components/Admin/QuestionTileComponent/QuestionTileComponent";
import UserTileComponent from "../../components/Admin/UserTileComponent/UserTileComponent";

import "./AdminMainPage.css";
import SearchComponent from "../../components/Admin/SearchComponent/SearchComponent";

const Users = props => {
    return (
        <div>
            <div className="admin-users__header">
                <h1>Users</h1>
                <SearchComponent
                    filter={props.filter}
                    placeholder="Search by ID, Name or Email"
                />
            </div>
            <table className="admin-users__table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Category</th>
                        <th>Verified</th>
                        <th>Created</th>
                        <th>Balance</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((user, index) => (
                        <UserTileComponent
                            key={index}
                            {...user}
                            users={props.data}
                            setUsers={props.setState}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Questions = props => {
    return (
        <div>
            <div className="admin-users__header">
                <h1>Questions</h1>
                <SearchComponent
                    filter={props.filter}
                    placeholder="Search by ID"
                />
            </div>
            <table className="admin-questions__table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Uploaded</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((question, index) => (
                        <QuestionTileComponent
                            key={index}
                            {...question}
                            questions={props.data}
                            setQuestions={props.setState}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default function AdminMainPage() {
    const [questions, setQuestions] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState("users");

    useEffect(() => {
        const getQuestions = () => axios.get("/api/admin/questions");
        const getUsers = () => axios.get("/api/admin/user");

        axios.all([getUsers(), getQuestions()]).then(
            axios.spread((users, questions) => {
                setQuestions(questions.data);
                setFilteredQuestions(questions.data);
                setUsers(users.data);
                setFilteredUsers(users.data);
            })
        );
    }, []);

    //Will pass this function to QuestionTileComponent
    const filterQuestions = search_term => {
        if (!search_term) {
            return setFilteredQuestions(questions);
        }
        setFilteredQuestions(
            questions.filter(question => {
                if (question.qid === parseInt(search_term)) {
                    return true;
                }

                return false;
            })
        );
    };

    const filterUsers = search_term => {
        if (!search_term) {
            return setFilteredUsers(users);
        }
        setFilteredUsers(
            users.filter(user => {
                if (user.uid === parseInt(search_term)) {
                    return true;
                }

                if (user.name.toLowerCase().includes(search_term)) {
                    return true;
                }

                if (user.email.toLowerCase().includes(search_term)) {
                    return true;
                }

                return false;
            })
        );
    };

    let page = null;

    switch (currentPage) {
        case "users":
            page = (
                <Users
                    data={filteredUsers}
                    setState={setFilteredUsers}
                    filter={filterUsers}
                />
            );
            break;
        case "questions":
            page = (
                <Questions
                    data={filteredQuestions}
                    setState={setFilteredQuestions}
                    filter={filterQuestions}
                />
            );
            break;
        default:
            page = "Select tab";
    }

    const activeStyle = page => {
        return `admin__side-nav__links__button ${currentPage === page &&
            "admin__side-nav__links__button-active"}`;
    };

    return (
        <div className="admin__container">
            <div className="admin__side-nav">
                <div className="admin__side-nav__links">
                    <button
                        onClick={() => setCurrentPage("users")}
                        className={activeStyle("users")}
                    >
                        <div className="admin__side-nav__button">
                            <FaUsers size="2.5rem" />
                            <span style={{ marginLeft: "1rem" }}>Users</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setCurrentPage("questions")}
                        className={activeStyle("questions")}
                    >
                        <div className="admin__side-nav__button">
                            <MdQuestionAnswer size="2.5rem" />
                            <span style={{ marginLeft: "1rem" }}>
                                Questions
                            </span>
                        </div>
                    </button>
                </div>
            </div>
            <div className="admin__content">{page}</div>
        </div>
    );
}

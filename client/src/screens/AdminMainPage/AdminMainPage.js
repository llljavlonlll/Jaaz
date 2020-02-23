import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdQuestionAnswer } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

import QuestionTileComponent from "../../components/Admin/QuestionTileComponent/QuestionTileComponent";
import UserTileComponent from "../../components/Admin/UserTileComponent/UserTileComponent";

import "./AdminMainPage.css";

const Users = props => {
    return (
        <div>
            <h1>Users</h1>
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
            <h1>Questions</h1>
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
    const [currentPage, setCurrentPage] = useState("users");

    useEffect(() => {
        const getQuestions = () => axios.get("/api/admin/questions");
        const getUsers = () => axios.get("/api/admin/user");

        axios.all([getUsers(), getQuestions()]).then(
            axios.spread((users, questions) => {
                setQuestions(questions.data);
                setUsers(users.data);
            })
        );
    }, []);

    let page = null;

    switch (currentPage) {
        case "users":
            page = <Users data={users} setState={setUsers} />;
            break;
        case "questions":
            page = <Questions data={questions} setState={setQuestions} />;
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
                        <FaUsers />
                        <span style={{ marginLeft: "1rem" }}>Users</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage("questions")}
                        className={activeStyle("questions")}
                    >
                        <MdQuestionAnswer />
                        <span style={{ marginLeft: "1rem" }}>Questions</span>
                    </button>
                </div>
            </div>
            <div className="admin__content">{page}</div>
        </div>
    );
}

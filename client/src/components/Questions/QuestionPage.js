import React, { Component } from "react";
import ReactLoading from "react-loading";
import Modal from "react-modal";
import moment from "moment";
import axios from "axios";

import QuestionDetailsComponent from "../QuestionDetailsComponent/QuestionDetailsComponent";

export default class QuestionPage extends Component {
    state = {
        status: "",
        uploaded_at: "",
        description: "",
        subject: "",
        owner: "",
        image_name: "",
        solution: [],
        modalIsOpen: false,
        isLoading: true
    };
    componentDidMount() {
        axios
            .get(`/api/question/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    status: res.data.status,
                    uploaded_at: res.data.uploaded_at,
                    description: res.data.description,
                    subject: res.data.subject,
                    owner: res.data.owner,
                    image_name: res.data.image_name,
                    solution: res.data.solution,
                    isLoading: false
                });
            })
            .catch(err => console.log(err));
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    handleQuestionDelete = () => {
        axios
            .delete(`/api/question/${this.props.match.params.id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log("Question deleted");
                    this.props.history.push("/");
                }
            })
            .catch(err => {
                console.log("Could not delete question!");
                console.log(err);
            });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        const { solution } = this.state;

        if (this.state.isLoading) {
            return <ReactLoading color={"#8357c5"} type={"spin"} />;
        }

        return (
            <div>
                <div className="question-page-container">
                    <QuestionDetailsComponent {...this.state} />
                    <div className="solution-box">
                        <h3 className="solution-box__title">Solution</h3>
                        <div className="solution-box__container">
                            {solution.length > 0 ? (
                                <div className="details">
                                    <div className="details-img">
                                        <a
                                            href={`/images/solutions/${solution[0].image}`}
                                        >
                                            <img
                                                src={`/images/solutions/${solution[0].image}`}
                                                alt="Solution"
                                                width="200"
                                            />
                                        </a>
                                    </div>
                                    <div className="details-info">
                                        <p>
                                            Description:{" "}
                                            {solution[0].description}
                                        </p>
                                        <p>
                                            Uploaded at:{" "}
                                            {moment(
                                                solution[0].uploaded_at
                                            ).format("DD/MM/YYYY")}
                                        </p>
                                        <p>
                                            Solved by: {solution[0].solved_by}
                                        </p>
                                        <p>
                                            Solved at:{" "}
                                            {moment(
                                                solution[0].solved_at
                                            ).format("DD/MM/YYYY")}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "table",
                                        height: "400px",
                                        overflow: "hidden"
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "table-cell",
                                            verticalAlign: "middle"
                                        }}
                                    >
                                        <div style={{ textAlign: "center" }}>
                                            In progress
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="action-box">
                    <h3 className="action-box__title">Actions</h3>
                    <div className="action-box__container">
                        <button
                            style={{
                                marginTop: 0,
                                background: "#963f3f",
                                borderBottom: "0.3rem solid #6b2c2c"
                            }}
                            onClick={this.openModal}
                        >
                            Delete question
                        </button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={{
                                content: {
                                    color: "white",
                                    background: "#464b5e",
                                    textAlign: "center",
                                    padding: "3.2rem",
                                    top: "50%",
                                    left: "50%",
                                    right: "auto",
                                    bottom: "auto",
                                    marginRight: "-50%",
                                    transform: "translate(-50%, -50%)"
                                }
                            }}
                            contentLabel="Example Modal"
                        >
                            <h2 style={{ margin: "0 0 2.4rem 0" }}>
                                Are you sure?
                            </h2>
                            <div>
                                <button
                                    onClick={this.handleQuestionDelete}
                                    style={{
                                        background: "#963f3f",
                                        border: "none",
                                        borderBottom: "0.3rem solid #6b2c2c",
                                        color: "white",
                                        padding: "0.8rem",
                                        marginRight: "2rem"
                                    }}
                                >
                                    Yes, delete
                                </button>
                                <button
                                    onClick={this.closeModal}
                                    style={{
                                        color: "#a5afd7",
                                        background: "none",
                                        border: "none",
                                        padding: "0.8rem"
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

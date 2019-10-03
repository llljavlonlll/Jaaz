import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import ReactLoading from "react-loading";
import Modal from "react-modal";

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
                    status: res.status,
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
        const {
            status,
            uploaded_at,
            description,
            subject,
            owner,
            image_name,
            solution
        } = this.state;

        if (this.state.isLoading) {
            return <ReactLoading color={"#8357c5"} type={"spin"} />;
        }

        return (
            <div>
                <div className="question-uploader">
                    <h3 className="question-uploader__title">Question</h3>
                    <div className="question-uploader__container">
                        <ul>
                            <li>Status: {status}</li>
                            <li>
                                Uploaded at:{" "}
                                {moment(uploaded_at).format("DD/MM/YYYY")}
                            </li>
                            <li>Description: {description}</li>
                            <li>Subject: {subject}</li>
                            <li>Owner: {owner}</li>
                            <li>
                                <img
                                    src={`/${image_name}`}
                                    alt="Question"
                                    width="200"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="question-uploader">
                    <h3 className="question-uploader__title">Solution</h3>
                    <div className="question-uploader__container">
                        {solution.length > 0 ? (
                            <ul>
                                <li>Description: {solution[0].description}</li>
                                <li>Solved by: {solution[0].solved_by}</li>
                                <li>Solved: {solution[0].date}</li>
                                <li>
                                    <img
                                        src={`/${solution[0].image}`}
                                        alt="Solution"
                                        width="200"
                                    />
                                </li>
                            </ul>
                        ) : (
                            "In progress"
                        )}
                    </div>
                </div>
                <div className="question-uploader">
                    <h3 className="question-uploader__title">Actions</h3>
                    <div className="question-uploader__container">
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

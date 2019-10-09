import React, { Component } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import Modal from "react-modal";
import SolutionUploader from "./SolutionUploader";
import QuestionsDetails from "../Questions/QuestionDetails";

export default class QuestionPage extends Component {
    state = {
        status: "",
        uploaded_at: "",
        description: "",
        subject: "",
        owner: "",
        image_name: "",
        solution: [],
        bookModalIsOpen: false,
        unbookModalIsOpen: false,
        isLoading: true
    };
    componentDidMount() {
        axios
            .get(`/api/pending/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    status: res.data.status,
                    uploaded_at: res.data.uploaded_at,
                    description: res.data.description,
                    subject: res.data.subject,
                    owner: res.data.owner,
                    image_name: res.data.image_name,
                    solution: res.data.solution,
                    isLoading: false,
                    alreadyBooked: false
                });
            })
            .catch(err => console.log(err));
    }

    openBookModal = () => {
        this.setState({ bookModalIsOpen: true });
    };

    openUnbookModal = () => {
        this.setState({ unbookModalIsOpen: true });
    };

    handleQuestionBook = () => {
        axios
            .post(`/api/solution/book/${this.props.match.params.id}`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        status: "Booked",
                        bookModalIsOpen: false,
                        unbookModalIsOpen: false
                    });
                }
            })
            .catch(err => {
                console.log(err.response.data.msg);
            });
    };
    handleQuestionUnbook = () => {
        axios
            .post(`/api/solution/unbook/${this.props.match.params.id}`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        status: "Pending",
                        bookModalIsOpen: false,
                        unbookModalIsOpen: false
                    });
                }
            })
            .catch(err => {
                console.log(err.response.data.msg);
            });
    };

    closeModal = () => {
        this.setState({ bookModalIsOpen: false, unbookModalIsOpen: false });
    };
    render() {
        const { solution } = this.state;

        if (this.state.isLoading) {
            return <ReactLoading color={"#8357c5"} type={"spin"} />;
        }

        return (
            <div>
                {this.state.status === "Pending" ||
                this.state.status === "Completed" ? (
                    <div className="question-uploader">
                        <h3 className="question-uploader__title">Action</h3>
                        <div className="question-uploader__container">
                            {this.state.status === "Pending" ? (
                                <button
                                    style={{
                                        marginTop: 0,
                                        background: "#8357c5",
                                        borderBottom: "0.3rem solid #66439b"
                                    }}
                                    onClick={this.openBookModal}
                                >
                                    Book this question
                                </button>
                            ) : this.state.status === "Completed" ? (
                                "Solved!"
                            ) : null}
                            <Modal
                                ariaHideApp={false}
                                id="bookModal"
                                isOpen={this.state.bookModalIsOpen}
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
                                        onClick={this.handleQuestionBook}
                                        style={{
                                            background: "#8357c5",
                                            border: "none",
                                            borderBottom:
                                                "0.3rem solid #66439b",
                                            color: "white",
                                            padding: "0.8rem 2rem",
                                            marginRight: "2rem"
                                        }}
                                    >
                                        Book
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
                ) : null}
                <QuestionsDetails {...this.state} />
                {solution.length > 0 && (
                    <div className="question-uploader">
                        <h3 className="question-uploader__title">Solution</h3>
                        <div className="question-uploader__container">
                            {solution.length > 0 ? (
                                <ul>
                                    <li>
                                        Description: {solution[0].description}
                                    </li>
                                    <li>Solved by: {solution[0].solved_by}</li>
                                    <li>Solved at: {solution[0].solved_at}</li>
                                    <li>
                                        <img
                                            src={`/${solution[0].image}`}
                                            alt="Solution"
                                            width="200"
                                        />
                                    </li>
                                </ul>
                            ) : (
                                <SolutionUploader />
                            )}
                        </div>
                    </div>
                )}
                {this.state.status === "Booked" ? (
                    <React.Fragment>
                        <div className="question-uploader">
                            <h3 className="question-uploader__title">Action</h3>
                            <div className="question-uploader__container">
                                <button
                                    style={{
                                        marginTop: 0,
                                        background: "#963f3f",
                                        borderBottom: "0.3rem solid #6b2c2c"
                                    }}
                                    onClick={this.openUnbookModal}
                                >
                                    Unbook this question
                                </button>
                            </div>
                        </div>
                        <Modal
                            ariaHideApp={false}
                            id="unbookModal"
                            isOpen={this.state.unbookModalIsOpen}
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
                                    onClick={this.handleQuestionUnbook}
                                    style={{
                                        background: "#963f3f",
                                        border: "none",
                                        borderBottom: "0.3rem solid #6b2c2c",
                                        color: "white",
                                        padding: "0.8rem 2rem",
                                        marginRight: "2rem"
                                    }}
                                >
                                    Unook
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
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}

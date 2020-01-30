import React, { Component } from "react";
import ReactLoading from "react-loading";
import Modal from "react-modal";
import axios from "axios";

import QuestionDetailsComponent from "../../components/Instructor/QuestionDetailsComponent/QuestionDetailsComponent";
import SolutionUploader from "../../components/Instructor/SolutionUploaderComponent/SolutionUploaderComponent";

import "./InstructorQuestionPage.css";

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
        isLoading: true,
        isUploading: false
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

    componentDidUpdate() {
        axios
            .get(`/api/pending/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    solution: res.data.solution
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

    handleStatusUpdate = status => {
        this.setState({
            status
        });
    };

    handleUploadAnimation = () => {
        this.setState({
            isUploading: !this.state.isUploading
        });
    };

    render() {
        if (this.state.isLoading) {
            return <ReactLoading color={"#8357c5"} type={"spin"} />;
        }

        return (
            <div className="instructor-question-page">
                {this.state.isUploading && (
                    <div className="upload-overlay">
                        <ReactLoading color={"#8357c5"} type={"spin"} />
                    </div>
                )}
                {this.state.status === "Pending" ? (
                    <div className="action-box">
                        <h3 className="action-box__title">Action</h3>
                        <div className="action-box__container">
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
                                <h1>Solved!</h1>
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

                <QuestionDetailsComponent {...this.state} />

                {this.state.status === "Booked" ? (
                    <React.Fragment>
                        <SolutionUploader
                            question_id={this.props.match.params.id}
                            // Pass image name to save the solution image's name
                            // as "solution-(quesiton_image_name)"
                            question_image_name={this.state.image_name}
                            handleStatusUpdate={this.handleStatusUpdate}
                            handleUploadAnimation={this.handleUploadAnimation}
                        />
                        <div className="action-box">
                            <h3 className="action-box__title">Action</h3>
                            <div className="action-box__container">
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

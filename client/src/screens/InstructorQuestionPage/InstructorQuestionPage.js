import React, { Component } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import { FormattedMessage, injectIntl } from "react-intl";

import QuestionDetailsComponent from "../../components/Instructor/QuestionDetailsComponent/QuestionDetailsComponent";
import SolutionUploader from "../../components/Instructor/SolutionUploaderComponent/SolutionUploaderComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";

import "./InstructorQuestionPage.css";

class QuestionPage extends Component {
    _isMounted = false;

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
        rejectModalIsOpen: false,
        isLoading: true,
        isUploading: false
    };

    componentDidMount() {
        this._isMounted = true;
        axios
            .get(`/api/pending/${this.props.match.params.id}`)
            .then(res => {
                if (this._isMounted) {
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
                }
            })
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    openBookModal = () => {
        this.setState({ bookModalIsOpen: true });
    };

    openUnbookModal = () => {
        this.setState({ unbookModalIsOpen: true });
    };

    openRejectModal = () => {
        this.setState({ rejectModalIsOpen: true });
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

    handleQuestionReject = () => {
        axios
            .post(`/api/solution/reject/${this.props.match.params.id}`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        status: "Rejected",
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
        this.setState({
            bookModalIsOpen: false,
            unbookModalIsOpen: false,
            rejectModalIsOpen: false
        });
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

    handleReceiveSolution = solution => {
        this.setState({
            solution
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
                        <h3 className="action-box__title">
                            <FormattedMessage
                                id="teacher.action.title"
                                defaultMessage="Action"
                            />
                        </h3>
                        <div className="action-box__container">
                            <React.Fragment>
                                <button
                                    style={{
                                        marginTop: 0,
                                        background: "#8357c5",
                                        borderBottom: "0.3rem solid #66439b",
                                        width: "40%"
                                    }}
                                    onClick={this.openBookModal}
                                >
                                    <FormattedMessage
                                        id="teacher.action.button.book"
                                        defaultMessage="Book"
                                    />
                                </button>
                                <button
                                    style={{
                                        marginTop: 0,
                                        background: "#963f3f",
                                        borderBottom: "0.3rem solid #6b2c2c",
                                        width: "40%"
                                    }}
                                    onClick={this.openRejectModal}
                                >
                                    <FormattedMessage
                                        id="teacher.action.button.reject"
                                        defaultMessage="Reject"
                                    />
                                </button>
                            </React.Fragment>
                            <ModalComponent
                                isOpen={this.state.bookModalIsOpen}
                                closeModal={this.closeModal}
                                acceptAction={this.handleQuestionBook}
                                acceptTitle="Book"
                                rejectTitle="Cancel"
                            />
                            <ModalComponent
                                isOpen={this.state.rejectModalIsOpen}
                                closeModal={this.closeModal}
                                acceptAction={this.handleQuestionReject}
                                acceptTitle="Reject"
                                rejectTitle="Cancel"
                                redStyle={true}
                            />
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
                            handleReceiveSolution={this.handleReceiveSolution}
                        />
                        <div className="action-box">
                            <h3 className="action-box__title">
                                <FormattedMessage
                                    id="teacher.action.title"
                                    defaultMessage="Action"
                                />
                            </h3>
                            <div className="action-box__container">
                                <button
                                    style={{
                                        marginTop: 0,
                                        background: "#963f3f",
                                        borderBottom: "0.3rem solid #6b2c2c"
                                    }}
                                    onClick={this.openUnbookModal}
                                >
                                    <FormattedMessage
                                        id="teacher.action.button.unbook"
                                        defaultMessage="Unbook this question"
                                    />
                                </button>
                            </div>
                        </div>
                        <ModalComponent
                            isOpen={this.state.unbookModalIsOpen}
                            closeModal={this.closeModal}
                            acceptAction={this.handleQuestionUnbook}
                            acceptTitle="Unbook"
                            rejectTitle="Cancel"
                            redStyle={true}
                        />
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}

export default injectIntl(QuestionPage);

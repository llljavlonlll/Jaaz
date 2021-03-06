import React, { Component } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import { FormattedMessage, injectIntl } from "react-intl";

import QuestionDetailsComponent from "../../components/Instructor/QuestionDetailsComponent/QuestionDetailsComponent";
import SolutionUploader from "../../components/Instructor/SolutionUploaderComponent/SolutionUploaderComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import CountdownComponent from "../../components/CountdownComponent/CountdownComponent";

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
        chat: "",
        bookModalIsOpen: false,
        unbookModalIsOpen: false,
        rejectModalIsOpen: false,
        isLoading: true,
        isUploading: false,
        booked_at: undefined,
    };

    componentDidMount() {
        this._isMounted = true;
        axios
            .get(`/api/pending/${this.props.match.params.id}`)
            .then((res) => {
                if (this._isMounted) {
                    this.setState({
                        status: res.data.status,
                        uploaded_at: res.data.uploaded_at,
                        description: res.data.description,
                        subject: res.data.subject,
                        owner: res.data.owner,
                        image_name: res.data.image_name,
                        solution: res.data.solution,
                        chat: res.data.chat,
                        isLoading: false,
                        alreadyBooked: false,
                        booked_at: res.data.booked_at,
                    });
                }
            })
            .catch((err) => console.log(err));
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
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        status: "Booked",
                        bookModalIsOpen: false,
                        unbookModalIsOpen: false,
                        booked_at: res.data.booked_at,
                    });
                    console.log(`[Booked at]: ${res.data.booked_at}`);
                }
            })
            .catch((err) => {
                console.log(err.response.data.msg);
            });
    };
    handleQuestionUnbook = () => {
        axios
            .post(`/api/solution/unbook/${this.props.match.params.id}`)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        status: "Pending",
                        bookModalIsOpen: false,
                        unbookModalIsOpen: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err.response.data.msg);
            });
    };

    handleQuestionReject = () => {
        axios
            .post(`/api/solution/reject/${this.props.match.params.id}`)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        status: "Rejected",
                        bookModalIsOpen: false,
                        unbookModalIsOpen: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err.response.data.msg);
            });
    };

    closeModal = () => {
        this.setState({
            bookModalIsOpen: false,
            unbookModalIsOpen: false,
            rejectModalIsOpen: false,
        });
    };

    handleStatusUpdate = (status) => {
        this.setState({
            status,
        });
    };

    handleUploadAnimation = () => {
        this.setState({
            isUploading: !this.state.isUploading,
        });
    };

    handleReceiveSolution = (solution) => {
        this.setState({
            solution,
        });
    };

    render() {
        if (this.state.isLoading) {
            return <ReactLoading color={"#8357c5"} type={"spin"} />;
        }

        const { intl } = this.props;

        return (
            <div className="instructor-question-page">
                {this.state.isUploading && (
                    <div className="upload-overlay">
                        <ReactLoading color={"#8357c5"} type={"spin"} />
                    </div>
                )}
                {this.state.status === "Pending" ? (
                    <div className="action-box">
                        {/*<h3 className="action-box__title">
                            <FormattedMessage
                                id="teacher.action.title"
                                defaultMessage="Action"
                            />
                </h3>*/}
                        <div className="action-box__container">
                            <React.Fragment>
                                <button
                                    style={{
                                        marginTop: 0,
                                        background: "#8357c5",
                                        borderBottom: "0.3rem solid #66439b",
                                        minWidth: "40%",
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
                                        minWidth: "40%",
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
                                acceptTitle={intl.formatMessage({
                                    id: "modal.book",
                                    defaultMessage: "Book",
                                })}
                                rejectTitle={intl.formatMessage({
                                    id: "modal.cancel",
                                    defaultMessage: "Cancel",
                                })}
                            />
                            <ModalComponent
                                isOpen={this.state.rejectModalIsOpen}
                                closeModal={this.closeModal}
                                acceptAction={this.handleQuestionReject}
                                acceptTitle={intl.formatMessage({
                                    id: "modal.reject",
                                    defaultMessage: "Reject",
                                })}
                                rejectTitle={intl.formatMessage({
                                    id: "modal.cancel",
                                    defaultMessage: "Cancel",
                                })}
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
                        <div className="action-box cancel-booking">
                            {/*<h3 className="action-box__title">
                                <FormattedMessage
                                    id="teacher.action.title"
                                    defaultMessage="Action"
                                />
                </h3>*/}

                            {/* Countdown component */}
                            {this.state.status === "Booked" && (
                                <CountdownComponent
                                    booking_time={this.state.booked_at}
                                    question_id={this.props.match.params.id}
                                />
                            )}
                            <div className="action-box__container">
                                <button
                                    style={{
                                        marginTop: 0,
                                        background: "transparent",
                                        borderBottom: "0.1rem solid #c87878",
                                        color: "#c87878",
                                        padding: 0,
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
                            acceptTitle={intl.formatMessage({
                                id: "modal.unbook",
                                defaultMessage: "Unbook",
                            })}
                            rejectTitle={intl.formatMessage({
                                id: "modal.cancel",
                                defaultMessage: "Cancel",
                            })}
                            redStyle={true}
                        />
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}

export default injectIntl(QuestionPage);

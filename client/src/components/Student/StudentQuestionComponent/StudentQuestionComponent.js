import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import moment from "moment";

import "./StudentQuestionComponent.css";
import ChatButtonComponent from "../ChatButtonComponent/ChatButtonComponent";
import RatingComponent from "../RatingComponent/RatingComponent";
import ChatComponent from "../../ChatComponent/ChatComponent";

const BackButton = () => {
    return (
        <Link to="/" className="back-button__container">
            <FiArrowLeft />
            <button className="back-button">
                <FormattedMessage id="navigation.back" defaultMessage="Back" />
            </button>
        </Link>
    );
};

export default function StudentQuestionComponent(props) {
    const [question, setQuestion] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuestion = async () => {
            const { data } = await axios.get(
                `/api/question/${props.questionId}`
            );
            setQuestion(data);
            setIsLoading(false);
        };
        fetchQuestion();
    }, [props.questionId]);

    const assignChat = chatId =>
        setQuestion(prevState => {
            return {
                ...prevState,
                chat: chatId
            };
        });

    if (isLoading) {
        return (
            <div className="student-question">
                <h3 className="student-question__title">
                    <BackButton />
                    {isLoading ? (
                        <p>
                            <FormattedMessage
                                id="loading"
                                defaultMessage="Loading..."
                            />
                        </p>
                    ) : (
                        <p>
                            {question.status === "Pending" ? (
                                <FormattedMessage
                                    id="status.pending"
                                    defaultMessage="Pending"
                                />
                            ) : question.status === "Booked" ? (
                                <FormattedMessage
                                    id="status.booked"
                                    defaultMessage="Booked"
                                />
                            ) : question.status === "Completed" ? (
                                <FormattedMessage
                                    id="status.completed"
                                    defaultMessage="Completed"
                                />
                            ) : (
                                <FormattedMessage
                                    id="status.rejected"
                                    defaultMessage="Rejected"
                                />
                            )}
                        </p>
                    )}
                </h3>
                <div className="student-question__loading">
                    <div className="student-question__loading-content">
                        <p style={{ color: "#a5afd7" }}>
                            <FormattedMessage
                                id="loading"
                                defaultMessage="Loading..."
                            />
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    let solution;

    if (question.solution.length > 0) {
        solution = (
            <React.Fragment>
                <div className="student-question__content__item">
                    <a
                        href={`/images/solutions/${question.solution[0].image}`}
                        className="student-question__content__item__image-container"
                    >
                        <img
                            className="student-question__content__item__image"
                            src={`/images/solutions/${question.solution[0].image}`}
                            alt="Question"
                        />
                    </a>
                    <div className="student-question__content__item__details-container">
                        <div className="student-question__content__item__details">
                            <div className="student-question__content__item__details__description">
                                {question.solution[0].description ? (
                                    question.solution[0].description
                                ) : (
                                    <FormattedMessage
                                        id="student.question.no-desc"
                                        defaultMessage="No description"
                                    />
                                )}
                            </div>
                            <div className="student-question__content__item__details__time">
                                <FormattedMessage
                                    id="student.question.answered-on"
                                    defaultMessage="Answered on"
                                />{" "}
                                {moment(question.solution[0].solved_at).format(
                                    "DD/MM/YYYY"
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        borderBottom: "1px solid #a5afd75d",
                        margin: "2.5rem 0"
                    }}
                ></div>

                <RatingComponent
                    rating={question.solution[0].rating}
                    questionId={question._id}
                />
                <div
                    style={{
                        borderBottom: "1px solid #a5afd75d",
                        margin: "2.5rem 0"
                    }}
                ></div>
                <ChatButtonComponent
                    chatId={question.chat}
                    questionId={question._id}
                    assignChat={assignChat}
                />
                <ChatComponent chatId={question.chat} />
            </React.Fragment>
        );
    } else {
        solution = (
            <div className="student-question__content__item">
                <div className="student-question__content__item__no-solution">
                    {question.status === "Pending" ? (
                        <FormattedMessage
                            id="student.question.pending"
                            defaultMessage="We are searching for qualified instructor"
                        />
                    ) : question.status === "Booked" ? (
                        <FormattedMessage
                            id="student.question.booked"
                            defaultMessage="Instructor working on your question"
                        />
                    ) : question.status === "Rejected" ? (
                        <FormattedMessage
                            id="student.question.rejected"
                            defaultMessage="Your question was rejected because photo was low quality or it contains more than one question. We credited your account for a refund"
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }

    const statusStyle =
        question.status === "Rejected"
            ? { color: "red" }
            : question.status === "Booked"
            ? { color: "yellow" }
            : question.status === "Completed"
            ? { color: "green" }
            : null;

    return (
        <div className="student-question">
            <div className="student-question__title">
                <BackButton />
                <p style={statusStyle}>{question.status}</p>
            </div>
            <div className="student-question__content">
                <div className="student-question__content__item">
                    <a
                        href={`/images/questions/${question.image_name}`}
                        className="student-question__content__item__image-container"
                    >
                        <img
                            className="student-question__content__item__image"
                            src={`/images/questions/${question.image_name}`}
                            alt="Solution"
                        />
                    </a>
                    <div className="student-question__content__item__details-container">
                        <div className="student-question__content__item__details">
                            <div className="student-question__content__item__details__description">
                                {question.description ? (
                                    question.description
                                ) : (
                                    <span
                                        style={{
                                            height: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            opacity: "0.2",
                                            margin: "0"
                                        }}
                                    >
                                        <FormattedMessage
                                            id="student.question.no-desc"
                                            defaultMessage="No description"
                                        />
                                    </span>
                                )}
                            </div>
                            <div className="student-question__content__item__details__time">
                                <FormattedMessage
                                    id="student.question.asked-on"
                                    defaultMessage="Asked on"
                                />{" "}
                                {moment(question.uploaded_at).format(
                                    "DD/MM/YYYY"
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        borderBottom: "1px solid #a5afd75d",
                        margin: "2.5rem"
                    }}
                ></div>
                {solution}
            </div>
        </div>
    );
}

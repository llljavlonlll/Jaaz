import moment from "moment";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import ImageMagnifyingComponent from "../../ImageMagnifyingComponent/ImageMagnifyingComponent";

import "./QuestionDetailsComponent.css";
import ChatComponent from "../../ChatComponent/ChatComponent";

export default function QuestionDetailsComponent(props) {
    const [imageModalToggle, setImageModalToggle] = useState({
        isModalOpen: false,
        src: "",
    });

    const handleImageModalClose = () => {
        setImageModalToggle({
            isModalOpen: false,
            src: "",
        });
    };
    return (
        <div className="question-details__container">
            <ImageMagnifyingComponent
                modalState={imageModalToggle.isModalOpen}
                url={imageModalToggle.src}
                closeModal={handleImageModalClose}
            />
            {props.chat && (
                <div className="question-details__chat">

                    <ChatComponent chatId={props.chat} />
                </div>
            )}
            <div className="question-details">
                <h3 className="question-details__title">
                    <FormattedMessage
                        id="teacher.question-details.title"
                        defaultMessage="Question details"
                    />
                </h3>
                <div
                    className="question__container"
                    style={{ borderBottom: "1px solid #a5afd74f" }}
                >
                    <div className="question__img">
                        <a
                            href="/#"
                            onClick={(event) => {
                                event.preventDefault();
                                setImageModalToggle({
                                    isModalOpen: true,
                                    src: `/images/questions/${props.image_name}`,
                                });
                            }}
                        >
                            <img
                                src={`/images/questions/thumbnails/${props.image_name}`}
                                alt="Question"
                                width="200"
                            />
                        </a>
                    </div>
                    <div className="question__info">
                        <p>{props.description}</p>
                        <p>{props.status}</p>
                        <p>{moment(props.uploaded_at).format("DD/MM/YYYY")}</p>
                        <p>{props.subject}</p>
                    </div>
                </div>

                {props.solution.length > 0 ? (
                    <div className="question__container">
                        <div className="question__img">
                            <a
                                href="/#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setImageModalToggle({
                                        isModalOpen: true,
                                        src: `/images/solutions/${props.solution[0].image}`,
                                    });
                                }}
                            >
                                <img
                                    src={`/images/solutions/thumbnails/${props.solution[0].image}`}
                                    alt="Solution"
                                    width="200"
                                />
                            </a>
                        </div>
                        <div className="question__info">
                            <p>{props.solution[0].description}</p>
                            <p>
                                {moment(props.solution[0].uploaded_at).format(
                                    "DD/MM/YYYY"
                                )}
                            </p>
                            <p>{props.solution[0].solved_by}</p>
                            <p>
                                {moment(props.solution[0].solved_at).format(
                                    "DD/MM/YYYY"
                                )}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="question__container">
                        <div className="question__content">
                            <p>
                                {props.status === "Booked" ? (
                                    <FormattedMessage
                                        id="status.booked"
                                        defaultMessage="Booked"
                                    />
                                ) : props.status === "Pending" ? (
                                    <FormattedMessage
                                        id="status.pending"
                                        defaultMessage="Pending"
                                    />
                                ) : props.status === "Rejected" ? (
                                    <FormattedMessage
                                        id="status.rejected"
                                        defaultMessage="Rejected"
                                    />
                                ) : (
                                    <FormattedMessage
                                        id="status.completed"
                                        defaultMessage="Completed"
                                    />
                                )}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

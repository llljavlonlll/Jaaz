import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./QuestionTileComponent.css";
import { FormattedMessage } from "react-intl";

export default function QuestionTileComponent(props) {
    return (
        <Link
            // to={`/question/${props._id}`}
            to={`/${props._id}`}
            style={{ textDecoration: "none", color: "#a5afd7", width: "100%" }}
        >
            <div className="question-tile">
                {<div className="question-tile__notification"></div>}
                <div className="question-tile__image-container">
                    <img
                        src={`/images/questions/${props.image_name}`}
                        alt="Question"
                    />
                </div>
                <div className="question-tile__content">
                    <h3>{props.description ? props.description : "---"}</h3>
                    <div className="question-tile__bullets">
                        <ul>
                            <li>ID: {props.qid}</li>

                            <li>
                                <FormattedMessage
                                    id="question-tile.status"
                                    defaultMessage="Status"
                                />
                                :{" "}
                                <span
                                    style={
                                        props.status === "Rejected"
                                            ? { color: "red" }
                                            : props.status === "Booked"
                                            ? { color: "yellow" }
                                            : props.status === "Completed"
                                            ? { color: "green" }
                                            : null
                                    }
                                >
                                    {props.status}
                                </span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <FormattedMessage
                                    id="question-tile.uploaded-at"
                                    defaultMessage="Uploaded at"
                                />
                                :{" "}
                                {moment(props.uploaded_at).format("DD/MM/YYYY")}
                            </li>
                            <li>
                                <FormattedMessage
                                    id="question-tile.subject"
                                    defaultMessage="Subject"
                                />
                                : {props.subject}
                            </li>
                            {/*<li>Solved by: Javlonbek B.</li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        </Link>
    );
}

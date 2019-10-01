import React from "react";
import { Link } from "react-router-dom";

export default function QuestionTileComponent(props) {
    return (
        <Link
            to={`/question/${props._id}`}
            style={{ textDecoration: "none", color: "#a5afd7" }}
        >
            <div className="question-tile">
                <div className="question-image-container">
                    <img src={`/${props.image_name}`} alt="Question" />
                </div>
                <div className="question-details">
                    <h3>
                        {props.description}
                        {/*props.description.length >= 22
                        ? props.description.substring(0, 21) + "..."
                    : props.description*/}
                    </h3>
                    <div className="question-bullets">
                        <ul>
                            <li>Subject: {props.subject}</li>
                            <li>
                                Status:{" "}
                                <span
                                    style={
                                        props.status === "Completed"
                                            ? { color: "green" }
                                            : { color: "yellow" }
                                    }
                                >
                                    {props.status}
                                </span>
                            </li>
                        </ul>
                        <ul>
                            <li>Uploaded at: {props.uploaded_at}</li>
                            {/*<li>Solved by: Javlonbek B.</li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        </Link>
    );
}

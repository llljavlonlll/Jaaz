import React from "react";
import moment from "moment";

export default function QuestionDetails(props) {
    return (
        <div className="question-uploader details">
            <h3 className="question-uploader__title">Question details</h3>
            <div className="question-uploader__container">
                <ul>
                    <li>Description: {props.description}</li>
                    <li>Status: {props.status}</li>
                    <li>
                        Uploaded at:{" "}
                        {moment(props.uploaded_at).format("DD/MM/YYYY")}
                    </li>
                    <li>Subject: {props.subject}</li>
                    <li>Owner: {props.owner}</li>
                    <li>
                        <a href={`/images/questions/${props.image_name}`}>
                            <img
                                src={`/images/questions/${props.image_name}`}
                                alt="Question"
                                width="200"
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

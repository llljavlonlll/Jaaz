import React from "react";
import moment from "moment";

export default function QuestionDetails(props) {
    return (
        <div className="question-uploader">
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
                        <img
                            src={`/${props.image_name}`}
                            alt="Question"
                            width="200"
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
}

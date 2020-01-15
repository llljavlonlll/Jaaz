import moment from "moment";
import React from "react";

import "./QuestionDetailsComponent.css";

export default function QuestionDetailsComponent(props) {
    return (
        <div className="question-details">
            <h3 className="question-details__title">Question details</h3>
            <div className="question-details__container">
                <div className="question-details__content">
                    <div className="question-details__img">
                        <a href={`/images/questions/${props.image_name}`}>
                            <img
                                src={`/images/questions/${props.image_name}`}
                                alt="Question"
                                width="200"
                            />
                        </a>
                    </div>
                    <div className="question-details__info">
                        <p>Description: {props.description}</p>
                        <p>Status: {props.status}</p>
                        <p>
                            Uploaded at:{" "}
                            {moment(props.uploaded_at).format("DD/MM/YYYY")}
                        </p>
                        <p>Subject: {props.subject}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

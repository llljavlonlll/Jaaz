import React from "react";
import moment from "moment";

export default function QuestionDetails(props) {
    return (
        <div className="box question-details-box">
            <h3 className="box__title">Question details</h3>
            <div className="box__container">
                <div className="details">
                    <div className="details-img">
                        <a href={`/images/questions/${props.image_name}`}>
                            <img
                                src={`/images/questions/${props.image_name}`}
                                alt="Question"
                                width="200"
                            />
                        </a>
                    </div>
                    <div className="details-info">
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

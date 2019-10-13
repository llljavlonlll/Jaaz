import React from "react";
import moment from "moment";

export default function QuestionDetails(props) {
    return (
        <div className="box">
            <h3 className="box__title">Question details</h3>
            <div className="box__container">
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

import "./StudentQuestionComponent.css";

const BackButton = () => {
    return (
        <Link to="/" className="back-button__container">
            <FiArrowLeft />
            <button className="back-button">Back</button>
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

    if (isLoading) {
        return (
            <div className="student-question">
                <h3 className="student-question__title">
                    <BackButton />
                    {isLoading ? <p>Loading...</p> : <p>{question.status}</p>}
                </h3>
                <div className="student-question__loading">
                    <div className="student-question__loading-content">
                        <p>Loading</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="student-question">
            <h3 className="student-question__title">
                <BackButton />
                <p>{question.status}</p>
            </h3>
            <div className="student-question__content">
                <div className="student-question__container">
                    <div>Details </div>
                </div>
            </div>
        </div>
    );
}

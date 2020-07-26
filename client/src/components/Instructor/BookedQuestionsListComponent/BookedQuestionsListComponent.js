import axios from "axios";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import Pagination from "../../PaginationComponent/PaginationComponent";
import QuestionTileComponent from "../../QuestionTileComponent/QuestionTileComponent";
import QuestionTileLoadingAnimation from "../../QuestionTileLoadingAnimation/QuestionTileLoadingAnimation";

import "./BookedQuestionsListComponent.css";

const BookedQuestionsList = props => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile] = useState(window.innerWidth <= 738);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(5);

    useEffect(() => {
        axios
            .get(props.apiPath)
            .then(res => {
                if (res.status === 200) {
                    setQuestions(res.data);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                setIsLoading(false);
            });
    }, [props.apiPath]);

    // Get questions to display on current page
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(
        indexOfFirstQuestion,
        indexOfLastQuestion
    );

    const changePage = pageNum => {
        setCurrentPage(pageNum);
    };

    return (
        <div className="booked-questions">
            <div className="booked-questions__content">
                <div className="booked-questions__container">
                    {questions.length > 0 && (
                        <Pagination
                            totalQuesitons={questions.length}
                            questionsPerPage={questionsPerPage}
                            changePage={changePage}
                            currentPage={currentPage}
                            className="available-questions__pagination"
                        />
                    )}
                    {isLoading ? (
                        <div>
                            <div style={{ height: "5rem" }}></div>
                            <QuestionTileLoadingAnimation mobile={isMobile} />
                            <QuestionTileLoadingAnimation mobile={isMobile} />
                            <QuestionTileLoadingAnimation mobile={isMobile} />
                            <QuestionTileLoadingAnimation mobile={isMobile} />
                            <QuestionTileLoadingAnimation mobile={isMobile} />
                            <div style={{ height: "5rem" }}></div>
                        </div>
                    ) : currentQuestions.length > 0 ? (
                        currentQuestions.map(question => {
                            return (
                                <QuestionTileComponent
                                    {...question}
                                    key={question._id}
                                />
                            );
                        })
                    ) : (
                        <div
                            style={{
                                display: "table",
                                height: "400px",
                                overflow: "hidden"
                            }}
                        >
                            <div
                                style={{
                                    display: "table-cell",
                                    verticalAlign: "middle"
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        color: "#a5afd7"
                                    }}
                                >
                                    <FormattedMessage
                                        id="teacher.booked.no-quest"
                                        defaultMessage="You have not booked any question yet"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {currentQuestions.length > 0 && (
                    <Pagination
                        totalQuesitons={questions.length}
                        questionsPerPage={questionsPerPage}
                        changePage={changePage}
                        currentPage={currentPage}
                        className="available-questions__pagination"
                    />
                )}
            </div>
        </div>
    );
};

export default BookedQuestionsList;

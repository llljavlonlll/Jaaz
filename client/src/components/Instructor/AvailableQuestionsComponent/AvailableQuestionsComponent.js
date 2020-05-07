import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { FormattedMessage, useIntl } from "react-intl";

import {
    loadQuestions,
    filterQuestions,
} from "../../../store/actions/questionsActions";
import { setSelectedSubject } from "../../../store/actions/instructorActions";
import QuestionTileLoadingAnimation from "../../QuestionTileLoadingAnimation/QuestionTileLoadingAnimation";
import QuestionTileComponent from "../../QuestionTileComponent/QuestionTileComponent";
import Pagination from "../../PaginationComponent/PaginationComponent";

import "./AvailableQuestionsComponent.css";

const AvailableQuestionsComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile] = useState(window.innerWidth <= 738);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(5);

    //Initialize dispatch function
    const dispatch = useDispatch();
    const intl = useIntl();

    // Fetch questions from database on initial render
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get("/api/pending");
                dispatch(loadQuestions(data));
                dispatch(filterQuestions(props.subject.toLowerCase()));
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.log(err.message);
            }
        };

        fetchPosts();
    }, [dispatch, props.api_path, props.subject]);

    // Grab questions from redux store
    const questions = useSelector((state) => state.questions.filteredQuestions);

    // Array of animations
    const loadingAnimations = [];
    for (let i = 0; i < 5; i++) {
        loadingAnimations.push(
            <QuestionTileLoadingAnimation mobile={isMobile} key={i} />
        );
    }

    // Get posts to display on current page
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(
        indexOfFirstQuestion,
        indexOfLastQuestion
    );

    const changePage = (pageNum) => {
        setCurrentPage(pageNum);
    };

    return (
        <div className="available-questions">
            <div className="available-questions__title">
                <div className="available-questions__title__back">
                    <a
                        href="/#"
                        className="back-button__container"
                        onClick={() => dispatch(setSelectedSubject())}
                    >
                        <FiArrowLeft />
                        <button className="back-button">
                            <FormattedMessage
                                id="navigation.back"
                                defaultMessage="Back"
                            />
                        </button>
                    </a>
                </div>
                <div className="available-questions__title__subject">
                    {/* check what subject was passed and assign "id" accordingly */}
                    {intl.formatMessage({
                        id:
                            props.subject === "Math"
                                ? "general.math"
                                : props.subject === "English"
                                ? "general.english"
                                : props.subject === "History"
                                ? "general.history"
                                : props.subject === "Physics"
                                ? "general.physics"
                                : props.subject === "Chemistry"
                                ? "general.chemistry"
                                : "general.computer",
                        defaultMessage: "{props.subject}",
                    })}
                </div>
            </div>
            <div className="available-questions__content">
                <div className="available-questions__container">
                    {!isLoading && questions.length > 0 && (
                        <Pagination
                            totalQuesitons={questions.length}
                            questionsPerPage={questionsPerPage}
                            changePage={changePage}
                            currentPage={currentPage}
                            className="available-questions__pagination"
                        />
                    )}
                    {isLoading ? (
                        <React.Fragment>
                            <div style={{ height: "5rem" }}></div>
                            <div>{loadingAnimations}</div>
                            <div style={{ height: "5rem" }}></div>
                        </React.Fragment>
                    ) : currentQuestions.length > 0 ? (
                        currentQuestions.map((question) => {
                            return (
                                <QuestionTileComponent
                                    key={question._id}
                                    {...question}
                                />
                            );
                        })
                    ) : (
                        <div
                            style={{
                                display: "table",
                                height: "400px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    display: "table-cell",
                                    verticalAlign: "middle",
                                }}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <FormattedMessage
                                        id="teacher.avail-quest.no-quest"
                                        defaultMessage="Currently, there are no questions left"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {!isLoading && questions.length > 0 && (
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

export default AvailableQuestionsComponent;

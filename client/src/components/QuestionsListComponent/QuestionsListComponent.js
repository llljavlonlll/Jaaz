import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { loadQuestions } from "../../store/actions/questionsActions";
import QuestionTileLoadingAnimation from "../Questions/QuestionTileLoadingAnimation";
import QuestionTileComponent from "../Questions/QuestionTileComponent";
import Pagination from "../PaginationComponent/PaginationComponent";
import "./QuestionsListComponent.css";

const QuestionsListComponent = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile] = useState(window.innerWidth <= 738);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage, setQuestionsPerPage] = useState(5);

    // Grab questions from redux store
    const questions = useSelector(state => state.questions);

    //Initialize dispatch function
    const dispatch = useDispatch();

    // Fetch questions from database on initial render
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get(props.api_path);
                dispatch(loadQuestions(data));
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.log(err.message);
            }
        };

        fetchPosts();
    }, [dispatch, props.api_path]);

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

    const changePage = pageNum => {
        setCurrentPage(pageNum);
    };

    return (
        <div className="questions-list">
            <h3 className="questions-list__title">{props.title}</h3>
            <div className="questions-list__content">
                <div className="questions-list__container">
                    {questions.length > questionsPerPage && (
                        <Pagination
                            totalQuesitons={questions.length}
                            questionsPerPage={questionsPerPage}
                            changePage={changePage}
                            currentPage={currentPage}
                            className="questions-list__pagination"
                        />
                    )}
                    {isLoading ? (
                        <div>{loadingAnimations}</div>
                    ) : currentQuestions.length > 0 ? (
                        currentQuestions.map(question => {
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
                                overflow: "hidden"
                            }}
                        >
                            <div
                                style={{
                                    display: "table-cell",
                                    verticalAlign: "middle"
                                }}
                            >
                                <div style={{ textAlign: "center" }}>
                                    {props.no_content}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {questions.length > questionsPerPage && (
                    <Pagination
                        totalQuesitons={questions.length}
                        questionsPerPage={questionsPerPage}
                        changePage={changePage}
                        currentPage={currentPage}
                        className="questions-list__pagination"
                    />
                )}
            </div>
        </div>
    );
};

export default QuestionsListComponent;

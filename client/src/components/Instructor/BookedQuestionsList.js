import React, { Component } from "react";
import QuestionTileComponent from "../Questions/QuestionTileComponent";
import axios from "axios";
import QuestionTileLoadingAnimation from "../Questions/QuestionTileLoadingAnimation";

export default class BookedQuestionsList extends Component {
    state = {
        questions: [],
        isLoading: true
    };
    componentDidMount() {
        axios
            .get("/api/booked")
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        questions: res.data,
                        isLoading: false
                    });
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                });
                console.log(err);
            });
    }
    render() {
        return (
            <div className="question-uploader">
                <h3 className="question-uploader__title">Booked questions</h3>
                <div className="question-uploader__container">
                    {this.state.isLoading ? (
                        <div>
                            <QuestionTileLoadingAnimation mobile={false} />
                            <QuestionTileLoadingAnimation mobile={false} />
                            <QuestionTileLoadingAnimation mobile={false} />
                            <QuestionTileLoadingAnimation mobile={false} />
                            <QuestionTileLoadingAnimation mobile={false} />
                        </div>
                    ) : this.state.questions.length > 0 ? (
                        this.state.questions.map(question => {
                            return (
                                <QuestionTileComponent
                                    {...question}
                                    key={question._id}
                                />
                            );
                        })
                    ) : (
                        "No questions"
                    )}
                </div>
            </div>
        );
    }
}

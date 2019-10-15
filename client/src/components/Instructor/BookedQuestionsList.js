import React, { Component } from "react";
import QuestionTileComponent from "../Questions/QuestionTileComponent";
import axios from "axios";
import QuestionTileLoadingAnimation from "../Questions/QuestionTileLoadingAnimation";

export default class BookedQuestionsList extends Component {
    state = {
        questions: [],
        isLoading: true,
        isMobile: window.innerWidth <= 738
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
            <div className="box">
                <h3 className="box__title">Booked questions</h3>
                <div className="box__container">
                    {this.state.isLoading ? (
                        <div>
                            <QuestionTileLoadingAnimation
                                mobile={this.state.isMobile}
                            />
                            <QuestionTileLoadingAnimation
                                mobile={this.state.isMobile}
                            />
                            <QuestionTileLoadingAnimation
                                mobile={this.state.isMobile}
                            />
                            <QuestionTileLoadingAnimation
                                mobile={this.state.isMobile}
                            />
                            <QuestionTileLoadingAnimation
                                mobile={this.state.isMobile}
                            />
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
                                    You have not booked any question yet
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

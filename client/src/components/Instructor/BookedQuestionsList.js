import React, { Component } from "react";
import QuestionTileComponent from "../Questions/QuestionTileComponent";
import axios from "axios";

export default class BookedQuestionsList extends Component {
    state = {
        questions: []
    };
    componentDidMount() {
        axios.get("/api/booked").then(res => {
            if (res.status === 200) {
                this.setState({
                    questions: res.data
                });
            }
        });
    }
    render() {
        return (
            <div className="question-uploader">
                <h3 className="question-uploader__title">Booked questions</h3>
                <div className="question-uploader__container">
                    <div id="inner">
                        {this.state.questions.length > 0
                            ? this.state.questions.map(question => {
                                  return (
                                      <QuestionTileComponent
                                          {...question}
                                          key={question._id}
                                      />
                                  );
                              })
                            : "No questions"}
                    </div>
                </div>
            </div>
        );
    }
}

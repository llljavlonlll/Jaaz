import React, { Component } from "react";
import QuestionTileComponent from "./QuestionTileComponent";
import axios from "axios";
import { connect } from "react-redux";
import { loadQuestions } from "../../actions/questionsActions";

class QuestionsSummaryComponent extends Component {
    componentDidMount() {
        axios
            .get("/api/question")
            .then(res => {
                this.props.dispatch(loadQuestions(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="question-uploader">
                <h3 className="question-uploader__title">Your questions</h3>
                <div className="question-uploader__container">
                    {this.props.questions.length > 0
                        ? this.props.questions.map(question => {
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
        );
    }
}

const mapStateToProps = state => {
    return {
        questions: state.questions
    };
};

export default connect(mapStateToProps)(QuestionsSummaryComponent);

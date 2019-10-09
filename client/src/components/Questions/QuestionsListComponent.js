import React, { Component } from "react";
import QuestionTileComponent from "./QuestionTileComponent";
import axios from "axios";
import { connect } from "react-redux";
import { loadQuestions } from "../../actions/questionsActions";

class QuestionsListComponent extends Component {
    componentDidMount() {
        axios
            .get(this.props.api_path)
            .then(res => {
                this.props.dispatch(loadQuestions(res.data));
            })
            .catch(err => {
                this.props.dispatch(loadQuestions());
                console.log(err);
            });
    }

    render() {
        return (
            <div className="question-uploader">
                <h3 className="question-uploader__title">{this.props.title}</h3>
                <div className="question-uploader__container">
                    <div id="inner">
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        questions: state.questions
    };
};

export default connect(mapStateToProps)(QuestionsListComponent);

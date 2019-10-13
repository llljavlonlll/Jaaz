import React, { Component } from "react";
import QuestionTileComponent from "./QuestionTileComponent";
import axios from "axios";
import { connect } from "react-redux";
import { loadQuestions } from "../../actions/questionsActions";
import QuestionTileLoadingAnimation from "./QuestionTileLoadingAnimation";

class QuestionsListComponent extends Component {
    state = {
        isLoading: true
    };
    componentDidMount() {
        axios
            .get(this.props.api_path)
            .then(res => {
                this.props.dispatch(loadQuestions(res.data));
                this.setState({
                    isLoading: false
                });
            })
            .catch(err => {
                this.props.dispatch(loadQuestions());
                this.setState({
                    isLoading: false
                });
                console.log(err);
            });
    }

    render() {
        return (
            <div className="question-uploader">
                <h3 className="question-uploader__title">{this.props.title}</h3>
                <div className="question-uploader__container">
                    {this.state.isLoading ? (
                        <div>
                            <QuestionTileLoadingAnimation />
                            <QuestionTileLoadingAnimation />
                            <QuestionTileLoadingAnimation />
                            <QuestionTileLoadingAnimation />
                            <QuestionTileLoadingAnimation />
                        </div>
                    ) : this.props.questions.length > 0 ? (
                        this.props.questions.map(question => {
                            return (
                                <QuestionTileComponent
                                    {...question}
                                    key={question._id}
                                />
                            );
                        })
                    ) : (
                        this.props.no_content
                    )}
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

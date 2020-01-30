import React, { Component } from "react";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";

import UploaderComponent from "../../components/Student/UploaderComponent/UploaderComponent";
import QuestionsListComponent from "../../components/QuestionsListComponent/QuestionsListComponent";
import StudentQuestionComponent from "../../components/Student/StudentQuestionComponent/StudentQuestionComponent";
import "./StudentMainPage.css";

class StudentMainPage extends Component {
    state = {
        isUploading: false
    };

    handleUploadAnimation = () => {
        this.setState({
            isUploading: !this.state.isUploading
        });
    };
    render() {
        let dashboard = null;

        if (Cookies.get("token")) {
            dashboard = (
                <div className="dash-container">
                    {this.state.isUploading && (
                        <div className="upload-overlay">
                            <ReactLoading color={"#8357c5"} type={"spin"} />
                        </div>
                    )}
                    <UploaderComponent
                        handleUploadAnimation={this.handleUploadAnimation}
                    />
                    {this.props.match.params.id ? (
                        <StudentQuestionComponent
                            questionId={this.props.match.params.id}
                        />
                    ) : (
                        <QuestionsListComponent
                            key={"allMyQuestions"}
                            api_path={"/api/question"}
                            title={"Your questions"}
                            no_content={"You don't have any questions yet"}
                        />
                    )}
                </div>
            );
        } else {
            dashboard = <Redirect to="/login" />;
        }

        return dashboard;
    }
}

export default StudentMainPage;

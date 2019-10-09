import React, { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router";
import QuestionsListComponent from "../Questions/QuestionsListComponent";
import BookedQuestionsList from "./BookedQuestionsList";

export default class InstructorDashboardPage extends Component {
    render() {
        let dashboard = null;

        if (Cookies.get("token")) {
            dashboard = (
                <div>
                    <QuestionsListComponent
                        key={"allAvailableQuestions"}
                        api_path={"/api/pending"}
                        title={"Available questions"}
                    />
                    <BookedQuestionsList />
                </div>
            );
        } else {
            dashboard = <Redirect to="/login" />;
        }

        return dashboard;
    }
}

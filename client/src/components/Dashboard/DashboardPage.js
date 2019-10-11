import React, { Component } from "react";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import UploaderComponent from "./UploaderComponent";
import QuestionsListComponent from "../Questions/QuestionsListComponent.js";

class DashboardPage extends Component {
    render() {
        let dashboard = null;

        if (Cookies.get("token")) {
            dashboard = (
                <div className="dash-container">
                    <UploaderComponent />
                    <QuestionsListComponent
                        api_path={"/api/question"}
                        title={"Your questions"}
                    />
                </div>
            );
        } else {
            dashboard = <Redirect to="/login" />;
        }

        return dashboard;
    }
}

export default DashboardPage;

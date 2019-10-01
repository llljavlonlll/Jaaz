import React, { Component } from "react";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import UploaderComponent from "./Dashboard/UploaderComponent";
import QuestionsSummaryComponent from "./Dashboard/QuestionsSummaryComponent";

class DashboardPage extends Component {
    render() {
        let dashboard = null;

        if (Cookies.get("token")) {
            dashboard = (
                <div>
                    <UploaderComponent />
                    <QuestionsSummaryComponent />
                </div>
            );
        } else {
            dashboard = <Redirect to="/login" />;
        }

        return dashboard;
    }
}

export default DashboardPage;

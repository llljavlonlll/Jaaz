import React, { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router";
import QuestionsListComponent from "../Questions/QuestionsListComponent";
import BookedQuestionsList from "./BookedQuestionsList";
import CompletedQuestionsList from "./CompletedQuestionsList";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default class InstructorDashboardPage extends Component {
    render() {
        let dashboard = null;

        if (Cookies.get("token")) {
            dashboard = (
                <Tabs>
                    <TabList>
                        <Tab>Available</Tab>
                        <Tab>Booked</Tab>
                        <Tab>Completed</Tab>
                    </TabList>

                    <TabPanel>
                        <QuestionsListComponent
                            key={"allAvailableQuestions"}
                            api_path={"/api/pending"}
                            title={"Available questions"}
                        />
                    </TabPanel>
                    <TabPanel>
                        <BookedQuestionsList />
                    </TabPanel>
                    <TabPanel>
                        <CompletedQuestionsList />
                    </TabPanel>
                </Tabs>
            );
        } else {
            dashboard = <Redirect to="/login" />;
        }

        return dashboard;
    }
}

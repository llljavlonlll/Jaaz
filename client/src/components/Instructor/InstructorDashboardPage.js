import React, { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router";
import QuestionsListComponent from "../QuestionsListComponent/QuestionsListComponent";
import BookedQuestionsList from "./BookedQuestionsList";
import CompletedQuestionsList from "./CompletedQuestionsList";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default class InstructorDashboardPage extends Component {
    state = {
        showDetails: window.innerWidth >= 1353
    };
    handleResize = () => {
        this.setState({
            showDetails: window.innerWidth >= 1353
        });
    };
    render() {
        let dashboard = null;

        window.addEventListener("resize", this.handleResize);

        if (Cookies.get("token")) {
            dashboard = (
                <div
                    className="instructor-dash"
                    style={{ maxWidth: "70rem", margin: "0 auto" }}
                >
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
                                no_content={
                                    "Currently, there are no questions left"
                                }
                            />
                        </TabPanel>
                        <TabPanel>
                            <BookedQuestionsList />
                        </TabPanel>
                        <TabPanel>
                            <CompletedQuestionsList />
                        </TabPanel>
                    </Tabs>
                    {/*this.state.showDetails && (
                        <div
                            className="box"
                            style={{ marginTop: "3rem" }}
                        >
                            <h3 className="box__title">
                                Details
                            </h3>
                            <div className="box__container"></div>
                        </div>
                    )*/}
                </div>
            );
        } else {
            dashboard = <Redirect to="/login" />;
        }

        return dashboard;
    }
}

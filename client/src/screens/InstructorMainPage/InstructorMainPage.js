import React from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Redirect } from "react-router";

import AvailableQuestionsComponent from "../../components/Instructor/AvailableQuestionsComponent/AvailableQuestionsComponent";
import CompletedQuestionsList from "../../components/Instructor/CompletedQuestionsListComponent/CompletedQuestionsListComponent";
import BookedQuestionsList from "../../components/Instructor/BookedQuestionsListComponent/BookedQuestionsListComponent";

import "react-tabs/style/react-tabs.css";
import "./InstructorMainPage.css";
import SubjectsComponent from "../../components/Instructor/SubjectsComponent/SubjectsComponent";

const InstructorMainPage = () => {
    const isAuthorized = useSelector(state => state.auth.isAuthorized);
    const selectedSubject = useSelector(state => state.instructor.subject);

    let dashboard = null;

    if (isAuthorized) {
        dashboard = (
            <div className="instructor-dash">
                {selectedSubject ? (
                    <AvailableQuestionsComponent subject={selectedSubject} />
                ) : (
                    <SubjectsComponent />
                )}
                <Tabs>
                    <TabList>
                        <Tab>Booked</Tab>
                        <Tab>Completed</Tab>
                    </TabList>

                    <TabPanel>
                        <BookedQuestionsList />
                    </TabPanel>
                    <TabPanel>
                        <CompletedQuestionsList />
                    </TabPanel>
                </Tabs>
            </div>
        );
    } else {
        dashboard = <Redirect to="/login" />;
    }

    return dashboard;
};

export default InstructorMainPage;

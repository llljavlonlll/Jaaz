import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Redirect } from "react-router";
import { FormattedMessage, useIntl } from "react-intl";

import AvailableQuestionsComponent from "../../components/Instructor/AvailableQuestionsComponent/AvailableQuestionsComponent";
// import CompletedQuestionsList from "../../components/Instructor/CompletedQuestionsListComponent/CompletedQuestionsListComponent";
import BookedQuestionsList from "../../components/Instructor/BookedQuestionsListComponent/BookedQuestionsListComponent";
import SubjectsComponent from "../../components/Instructor/SubjectsComponent/SubjectsComponent";
import NotificationsPermissionComponent from "../../components/Instructor/NotificationsPermissionComponent/NotificationsPermissionComponent";

import "react-tabs/style/react-tabs.css";
import "./InstructorMainPage.css";

// Push notification
import { pushInitialize } from "../../settings/PushNotification";

const InstructorMainPage = () => {
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const selectedSubject = useSelector((state) => state.instructor.subject);
    const [showNotifToast, setShowNotifToast] = useState(false);

    const intl = useIntl();

    let dashboard = null;

    useEffect(() => {
        if (Notification.permission === "default") {
            setShowNotifToast(true);
        }
    }, []);

    const closeToast = (event) => {
        setShowNotifToast(false);
        if (event) {
            event.stopPropagation();
        }
    };

    if (isAuthorized) {
        dashboard = (
            <div className="instructor-dash">
                {showNotifToast && (
                    <NotificationsPermissionComponent
                        askPermission={pushInitialize}
                        closeToast={closeToast}
                    />
                )}
                {selectedSubject ? (
                    <AvailableQuestionsComponent subject={selectedSubject} />
                ) : (
                    <SubjectsComponent />
                )}
                <Tabs>
                    <TabList>
                        <Tab>
                            <FormattedMessage
                                id="teacher.booked.title"
                                defaultMessage="Booked"
                            />
                        </Tab>
                        <Tab>
                            <FormattedMessage
                                id="teacher.completed.title"
                                defaultMessage="Completed"
                            />
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <BookedQuestionsList
                            apiPath="/api/booked"
                            noQuestion={intl.formatMessage({
                                id: "teacher.booked.no-quest",
                                defaultMessage:
                                    "You have not booked any questions yet",
                            })}
                        />
                    </TabPanel>
                    <TabPanel>
                        <BookedQuestionsList
                            apiPath="/api/completed"
                            noQuestion={intl.formatMessage({
                                id: "teacher.completed.no-quest",
                                defaultMessage:
                                    "You have not completed any questions yet",
                            })}
                        />
                        {/*<CompletedQuestionsList />*/}
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

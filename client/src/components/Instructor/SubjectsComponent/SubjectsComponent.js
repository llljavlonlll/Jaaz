import React from "react";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";

import { setSelectedSubject } from "../../../store/actions/instructorActions";
import "./SubjectsComponent.css";
import { FormattedMessage } from "react-intl";

const SubjectsComponent = props => {
    const dispatch = useDispatch();
    const intl = useIntl();

    const subjectTile = (title, subject) => {
        return (
            <li onClick={() => dispatch(setSelectedSubject(subject))}>
                <div className="subject-tile">
                    <div className="subject-tile__title">{title}</div>
                </div>
            </li>
        );
    };

    return (
        <div className="subjects">
            <div className="subjects__title">
                <FormattedMessage
                    id="teacher.subjects.title"
                    defaultMessage="Choose a subject"
                />
            </div>
            <ul className="subjects__row">
                {subjectTile(
                    intl.formatMessage({ id: "math", defaultMessage: "Math" }),
                    "Math"
                )}
                {subjectTile(
                    intl.formatMessage({
                        id: "english",
                        defaultMessage: "English"
                    }),
                    "English"
                )}
                {subjectTile(
                    intl.formatMessage({
                        id: "physics",
                        defaultMessage: "Physics"
                    }),
                    "Physics"
                )}
                {subjectTile(
                    intl.formatMessage({
                        id: "chemistry",
                        defaultMessage: "Chemisry"
                    }),
                    "Chemistry"
                )}
                {subjectTile(
                    intl.formatMessage({
                        id: "history",
                        defaultMessage: "History"
                    }),
                    "History"
                )}
                {subjectTile(
                    intl.formatMessage({
                        id: "computer",
                        defaultMessage: "Computer Science"
                    }),
                    "Computer Science"
                )}
            </ul>
        </div>
    );
};

export default SubjectsComponent;

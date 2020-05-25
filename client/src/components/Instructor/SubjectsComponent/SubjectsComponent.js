import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import axios from "axios";

import { setSelectedSubject } from "../../../store/actions/instructorActions";
import "./SubjectsComponent.css";
import { FormattedMessage } from "react-intl";

const SubjectsComponent = (props) => {
    const [subjectCount, setSubjectCount] = useState({});

    const dispatch = useDispatch();
    const intl = useIntl();

    useEffect(() => {
        axios
            .get("/api/pending/count")
            .then((res) => {
                setSubjectCount(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const subjectTile = (title, subject) => {
        return (
            <li onClick={() => dispatch(setSelectedSubject(subject))}>
                <div className="subject-tile">
                    <div className="subject-tile__notification">
                        {subjectCount[subject] || 0}
                    </div>
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
                    defaultMessage="Questions"
                />
            </div>
            <ul className="subjects__row">
                {subjectTile(
                    intl.formatMessage({
                        id: "general.math",
                        defaultMessage: "Math",
                    }),
                    "Math"
                )}
                {subjectTile(
                    intl.formatMessage({
                        id: "general.english",
                        defaultMessage: "English",
                    }),
                    "English"
                )}
                {subjectTile(
                    intl.formatMessage({
                        id: "general.physics",
                        defaultMessage: "Physics",
                    }),
                    "Physics"
                )}
                {subjectTile(
                    intl.formatMessage({
                        id: "general.chemistry",
                        defaultMessage: "Chemisry",
                    }),
                    "Chemistry"
                )}
                {subjectTile(
                    intl.formatMessage({
                        id: "general.history",
                        defaultMessage: "History",
                    }),
                    "History"
                )}
                {subjectTile(
                    intl.formatMessage({
                        id: "general.computer",
                        defaultMessage: "Computer Science",
                    }),
                    "Computer Science"
                )}
            </ul>
        </div>
    );
};

export default SubjectsComponent;

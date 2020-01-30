import React from "react";
import { useDispatch } from "react-redux";

import { setSelectedSubject } from "../../../store/actions/instructorActions";
import "./SubjectsComponent.css";

// const SubjectTile = props => {
//     return (
//         <Link
//             to="/"
//             onClick={props.setSelectedSubject(props.title.toLowerCase())}
//         >
//             <div className="subject-tile">
//                 <div className="subject-tile__title">{props.title}</div>
//             </div>
//         </Link>
//     );
// };

const SubjectsComponent = props => {
    const dispatch = useDispatch();

    const subjectTile = title => {
        return (
            <li onClick={() => dispatch(setSelectedSubject(title))}>
                <div className="subject-tile">
                    <div className="subject-tile__title">{title}</div>
                </div>
            </li>
        );
    };

    return (
        <div className="subjects">
            <div className="subjects__title">Choose a subject</div>
            <ul className="subjects__row">
                {subjectTile("Math")}
                {subjectTile("English")}
                {subjectTile("Physics")}
                {subjectTile("Chemisry")}
                {subjectTile("History")}
                {subjectTile("Computer Science")}
            </ul>
        </div>
    );
};

export default SubjectsComponent;

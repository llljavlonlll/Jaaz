import React from "react";

import "./ProgressComponent.css";

export default function ProgressComponent(props) {
    return (
        <div className="progress">
            <div className="progress_percentage">{props.value}%</div>
            <div className="progress__bar__container">
                <div
                    className="progress__bar"
                    style={{ width: `${props.value}%` }}
                ></div>
            </div>
        </div>
    );
}

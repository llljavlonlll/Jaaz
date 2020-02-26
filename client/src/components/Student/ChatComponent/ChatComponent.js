import React from "react";

import "./ChatComponent.css";

export default function ChatComponent() {
    return (
        <div className="chat">
            <div className="chat__container">
                <div className="chat__container__messages"></div>
                <div className="chat__container__details"></div>
            </div>
            <div className="chat__input">
                <input type="text" />
                <button>Send</button>
            </div>
        </div>
    );
}

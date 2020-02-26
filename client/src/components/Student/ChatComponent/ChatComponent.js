import React from "react";

import "./ChatComponent.css";
import { FormattedMessage } from "react-intl";

export default function ChatComponent(props) {
    if (!props.chatId) {
        return null;
    }
    return (
        <div className="chat">
            <div className="chat__container">
                <div className="chat__container__messages"></div>
                <div className="chat__container__details"></div>
            </div>
            <div className="chat__input">
                <input type="text" />
                <button>
                    <FormattedMessage id="chat.send" defaultMessage="Send" />
                </button>
            </div>
        </div>
    );
}

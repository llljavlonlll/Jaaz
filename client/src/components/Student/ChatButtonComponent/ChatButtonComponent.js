import React from "react";
import { FormattedMessage } from "react-intl";

import "./ChatButtonComponent.css";

export default function ChatComponent(props) {
    return (
        <div
            className="chat-button__container"
            style={props.chatId && { backgroundColor: "#333745" }}
        >
            {!props.chatId ? (
                <button className="chat-button">
                    <FormattedMessage
                        id="chat.button"
                        defaultMessage="Ask for details"
                    />
                </button>
            ) : (
                <div className="chat-button--selected">
                    <FormattedMessage id="chat.title" defaultMessage="Chat" />
                </div>
            )}
        </div>
    );
}

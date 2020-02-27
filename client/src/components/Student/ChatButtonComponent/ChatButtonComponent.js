import React from "react";
import { FormattedMessage } from "react-intl";
import Axios from "axios";

import "./ChatButtonComponent.css";

export default function ChatComponent(props) {
    const createChat = () => {
        Axios.post(`/api/chat/${props.questionId}`)
            .then(res => props.assignChat(res.data.chat))
            .catch(err => console.log(err.message));
    };

    return (
        <div
            className="chat-button__container"
            style={props.chatId && { backgroundColor: "#333745" }}
        >
            {!props.chatId ? (
                <button className="chat-button" onClick={createChat}>
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

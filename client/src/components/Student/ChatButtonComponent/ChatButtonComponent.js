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

    return !props.chatId ? (
        <div className="chat-button__container">
            <button className="chat-button" onClick={createChat}>
                <FormattedMessage
                    id="chat.button"
                    defaultMessage="Ask for details"
                />
            </button>
        </div>
    ) : null;
}

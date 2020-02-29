import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "glamor";

//Socket connection
import io from "socket.io-client";

import "./ChatComponent.css";
import Axios from "axios";

let socket;

const ROOT_CSS = css({
    flex: 3,
    marginRight: "2rem",
    backgroundColor: "#464b5e",
    padding: "1rem",
    overflow: "auto"
});

const SCROLL_CONTAINER = css({
    display: "flex",
    flexDirection: "column"
});

const DOWN_ARROW = css({
    height: "3.5rem",
    width: "3.5rem"
});

const ChatMessage = props => {
    const myUID = useSelector(state => state.auth.userData.uid);

    const isThisMessageMine = props.message.owner_uid === myUID;

    return (
        <div
            className={`chat__message ${
                isThisMessageMine ? "my-message" : null
            }`}
        >
            {props.message.owner_uid} - {props.message.message}
        </div>
    );
};

export default function ChatComponent(props) {
    const ENDPOINT = "localhost:5001";
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get(`/api/chat/${props.chatId}`).then(res =>
            setMessages(res.data.chat.messages)
        );
        socket = io(ENDPOINT);
        socket.emit("join", { chatId: props.chatId });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [ENDPOINT, props.chatId]);

    useEffect(() => {
        socket.on("message", (payload, cb) => {
            setMessages([...messages, payload.message]);
        });

        return () => {
            socket.removeListener("message");
        };
    }, [messages]);

    const sendMessage = event => {
        Axios.post(`/api/chat/${props.chatId}/addMessage`, {
            message
        }).then(res => {
            socket.emit(
                "userMessage",
                { chatId: props.chatId, message: res.data.newMessage },
                () => setMessage("")
            );
        });
    };

    if (!props.chatId) {
        return null;
    }
    return (
        <div className="chat" style={props.style}>
            <div className="chat__container">
                <ScrollToBottom
                    className={ROOT_CSS}
                    scrollViewClassName={SCROLL_CONTAINER}
                    followButtonClassName={DOWN_ARROW}
                >
                    {messages.map((message, index) => (
                        <ChatMessage message={message} key={index} />
                    ))}
                </ScrollToBottom>
                <div className="chat__container__details"></div>
            </div>
            <div className="chat__input">
                <input
                    type="text"
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    onKeyPress={event =>
                        event.key === "Enter" ? sendMessage() : null
                    }
                />
                <button onClick={sendMessage}>
                    <FormattedMessage id="chat.send" defaultMessage="Send" />
                </button>
            </div>
        </div>
    );
}

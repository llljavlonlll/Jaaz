import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import ScrollToBottom from "react-scroll-to-bottom";

//Socket connection
import io from "socket.io-client";

import "./ChatComponent.css";
import Axios from "axios";

let socket;

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
                <ScrollToBottom className="chat__container__messages">
                    {messages.map((message, index) => (
                        <p key={index}>
                            {message.owner_uid} - {message.message}
                        </p>
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

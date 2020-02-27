import React, { useEffect, useState } from "react";

//Socket connection
import io from "socket.io-client";

import "./ChatComponent.css";
import { FormattedMessage } from "react-intl";

let socket;

export default function ChatComponent(props) {
    const ENDPOINT = "localhost:5001";
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (props.chatId) {
            socket = io(ENDPOINT);
            socket.emit("join", { chatId: props.chatId });
        }

        console.log("useEffect1");

        return () => {
            if (props.chatId) {
                socket.disconnect();
                socket.off();
            }
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
        if (message) {
            socket.emit("userMessage", { chatId: props.chatId, message }, () =>
                setMessage("")
            );
        }

        console.log("sendMessage");
    };

    if (!props.chatId) {
        return null;
    }
    return (
        <div className="chat">
            <div className="chat__container">
                <div className="chat__container__messages">
                    {messages.map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
                </div>
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

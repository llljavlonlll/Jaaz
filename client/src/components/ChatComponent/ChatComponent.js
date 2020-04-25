import React, { useEffect, useState, useCallback } from "react";
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
    // marginRight: "2rem",
    backgroundColor: "#464b5e",
    padding: "1rem",
    "@media (max-width: 530px)": {
        padding: "0px",
    },
});

const SCROLL_CONTAINER = css({
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    "::-webkit-scrollbar": {
        width: "0px",
        background: "transparent",
    },
});

const DOWN_ARROW = css({
    height: "3.5rem",
    width: "3.5rem",
});

const ChatMessage = (props) => {
    const myUID = useSelector((state) => state.auth.userData.uid);

    const isThisMessageMine = props.message.owner_uid === myUID;

    return (
        <div
            className={`chat__message ${
                isThisMessageMine ? "my-message" : null
            }`}
        >
            {/*props.message.owner_uid*/}
            {props.message.message}
        </div>
    );
};

export default function ChatComponent(props) {
    const userData = useSelector((state) => state.auth.userData);
    const ENDPOINT = "localhost:5001";
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        if (room) {
            setStatus(
                room.users.includes(
                    userData.category === "customer" ? "instructor" : "customer"
                )
            );
        }
    }, [room, userData.category]);

    // const checkStatus = () => {
    //     if (!room) {
    //         return;
    //     }

    //     setStatus(
    //         room.users.includes(
    //             userData.category === "customer" ? "instructor" : "customer"
    //         )
    //     );
    // };

    //Get user data from state

    const disconnectFromSocket = useCallback(() => {
        // Emit event before disconnection
        socket.emit("aboutToDisconnect", {
            chatId: props.chatId,
            userCategory: userData.category,
        });
        socket.disconnect(true);
    }, [props.chatId, userData.category]);

    useEffect(() => {
        window.addEventListener("beforeunload", disconnectFromSocket);

        return () => {
            window.removeEventListener("beforeunload", disconnectFromSocket);
        };
    }, [disconnectFromSocket]);

    useEffect(() => {
        // Fetch messages from DB
        Axios.get(`/api/chat/${props.chatId}`).then((res) =>
            setMessages(res.data.chat.messages)
        );

        // Connect to server socket
        socket = io(ENDPOINT);

        // Emit join event to join a room
        socket.emit(
            "join",
            {
                chatId: props.chatId,
                userCategory: userData.category,
            },
            (room) => {
                setRoom(room);
                // checkStatus();
            }
        );

        return () => {
            disconnectFromSocket();
        };
    }, [ENDPOINT, props.chatId, disconnectFromSocket, userData.category]);

    useEffect(() => {
        // Listen for incoming messages
        socket.on("message", (payload, cb) => {
            setMessages([...messages, payload.message]);
        });

        return () => {
            socket.removeListener("message");
        };
    }, [messages]);

    useEffect(() => {
        // Listen for room updates
        socket.on("roomUpdate", (payload, cb) => {
            setRoom(payload.room);
            // checkStatus();
        });

        return () => {
            socket.removeListener("roomUpdate");
        };
    }, [room]);

    const sendMessage = (event) => {
        if (message) {
            Axios.post(`/api/chat/${props.chatId}/addMessage`, {
                message,
            }).then((res) => {
                socket.emit(
                    "userMessage",
                    { chatId: props.chatId, message: res.data.newMessage },
                    () => setMessage("")
                );
            });
        }
    };

    if (!props.chatId) {
        return null;
    }
    return (
        <div className="chat" style={props.style}>
            <div className="chat__details">
                <div className="chat__details__user">
                    {userData.category === "customer"
                        ? "Instructor"
                        : "Student"}
                </div>
                <div
                    className="chat__details__status"
                    style={status ? { color: "#8357c5" } : null}
                >
                    {status ? "Online" : "Offline"}
                </div>
            </div>
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
            </div>
            <div className="chat__input">
                <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={(event) =>
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

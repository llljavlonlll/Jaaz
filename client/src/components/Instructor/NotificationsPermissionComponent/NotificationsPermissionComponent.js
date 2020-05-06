import React from "react";
import { MdClose, MdNotificationsNone } from "react-icons/md";

// Push notification
import { pushInitialize } from "../../../settings/PushNotification";

import "./NotificationsPermissionComponent.css";

export default function NotificationsPermissionComponent(props) {
    return (
        <div
            className="notif-permission"
            onClick={() => {
                pushInitialize();
                props.closeToast();
            }}
        >
            <MdNotificationsNone size={40} style={{ margin: "0 1rem 0 0" }} />
            <p>Click here to get notified when new questions are available</p>
            <MdClose
                className="notif-permission__close-button"
                size={16}
                onClick={props.closeToast}
            />
        </div>
    );
}

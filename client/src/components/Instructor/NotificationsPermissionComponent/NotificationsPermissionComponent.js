import React, { useState } from "react";
import { MdClose, MdNotificationsNone } from "react-icons/md";

import "./NotificationsPermissionComponent.css";

export default function NotificationsPermissionComponent(props) {
    return (
        <div className="notif-permission" onClick={props.askPermission}>
            <MdNotificationsNone size={40} />
            <p>Click here to get notified when new questions are available</p>
            <MdClose
                className="notif-permission__close-button"
                size={16}
                onClick={() => {}}
            />
        </div>
    );
}

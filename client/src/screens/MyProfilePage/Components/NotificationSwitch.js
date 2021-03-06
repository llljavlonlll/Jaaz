import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// MaterialUI components
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// Push notification settings
import {
    pushUninitialize,
    pushInitialize,
} from "../../../settings/PushNotification";

import "./NotificationSwitch.css";

const PurpleSwitch = withStyles({
    switchBase: {
        color: purple[0],
        "&$checked": {
            color: "#8357c5",
        },
        "&$checked + $track": {
            backgroundColor: "#8357c5",
        },
    },
    checked: {},
    track: {},
})(Switch);

export default function NotificationSwitch() {
    const [notifState, setNotifState] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const subscriptions = useSelector(
        (state) => state.auth.userData.subscriptions
    );

    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            navigator.serviceWorker.ready.then((swRegistration) => {
                swRegistration.pushManager
                    .getSubscription()
                    .then((subscription) => {
                        if (subscription) {
                            if (subscriptions.length > 0) setNotifState(true);
                        } else {
                            setNotifState(false);
                        }
                    });
            });
            if (Notification.permission === "denied") {
                setDisabled(true);
            }
        } else {
            setDisabled(true);
        }
    }, [subscriptions.length]);

    const handleChange = (event) => {
        setNotifState(event.target.checked);
        if (event.target.checked) {
            pushInitialize();
        } else {
            pushUninitialize();
        }
    };
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <PurpleSwitch
                        checked={notifState}
                        onChange={handleChange}
                        disabled={disabled}
                    />
                }
            />
        </FormGroup>
    );
}

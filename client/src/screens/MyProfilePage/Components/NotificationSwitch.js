import React, { useState, useEffect } from "react";

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
            color: purple[400],
        },
        "&$checked + $track": {
            backgroundColor: purple[400],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default function NotificationSwitch() {
    const [notifState, setNotifState] = useState(false);

    useEffect(() => {
        navigator.serviceWorker.ready.then((swRegistration) => {
            swRegistration.pushManager
                .getSubscription()
                .then((subscription) => {
                    if (subscription) {
                        setNotifState(true);
                    } else {
                        setNotifState(false);
                    }
                });
        });
    }, []);

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
                    />
                }
            />
        </FormGroup>
    );
}

import Axios from "axios";

const applicationServerPublicKey =
    "BIkqpsJnEPZtHek1RXwcsPMf3CS_R9eJHg-VNn7a0b5YX7Hd1w1crki_v7imzUDuKYONttFz3LnGcAAflqarKHQ";
let swRegistration = null;

// Update user's subscription to push notifications on the server
const updateSubscriptionOnServer = (subscription) => {
    Axios.post("/api/notifications/subscribe", subscription).catch((err) => {
        console.log(err.message);
    });
};

// Decode public VAPID key
const urlB64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

// Check if user's browser supports service workers and push notifications
// then subscribe user
export const pushInitialize = () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker
            .register("sw.js")
            .then((swReg) => {
                swRegistration = swReg;
                subscribeUser();
            })
            .catch((error) => {});
    } else {
        console.warn("Push messaging is not supported");
    }
};
export const pushUninitialize = () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker.ready
            .then((swReg) => {
                swRegistration = swReg;
                unsubscribeUser();
            })
            .catch((error) => {});
    } else {
        console.warn("Could not unsubscribe!");
    }
};

const subscribeUser = () => {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager
        .subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey,
        })
        .then((subscription) => {
            // console.log("User is subscribed.");
            // console.log(JSON.stringify(subscription));
            updateSubscriptionOnServer(subscription);
        })
        .catch((err) => {
            console.log("Failed to subscribe the user: ", err);
        });
};

// Unsubscribe from push notif.
const unsubscribeUser = () => {
    swRegistration.pushManager
        .getSubscription()
        .then((subscription) => {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch((error) => {
            console.log("Error unsubscribing", error);
        })
        .then(() => {
            updateSubscriptionOnServer(null);
            console.log("User is unsubscribed.");
        });
};

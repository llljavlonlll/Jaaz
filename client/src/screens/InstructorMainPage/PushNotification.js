import Axios from "axios";

const pushInitialize = () => {
    const applicationServerPublicKey =
        "BIkqpsJnEPZtHek1RXwcsPMf3CS_R9eJHg-VNn7a0b5YX7Hd1w1crki_v7imzUDuKYONttFz3LnGcAAflqarKHQ";

    let isSubscribed = false;
    let swRegistration = null;

    function urlB64ToUint8Array(base64String) {
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
    }

    if ("serviceWorker" in navigator && "PushManager" in window) {
        // console.log("Service Worker and Push is supported");

        navigator.serviceWorker
            .register("sw.js")
            .then(function (swReg) {
                // console.log("Service Worker is registered", swReg);

                swRegistration = swReg;
                initializeUI();
            })
            .catch(function (error) {
                // console.error("Service Worker Error", error);
            });
    } else {
        // console.warn("Push messaging is not supported");
    }

    function initializeUI() {
        // Set the initial subscription value
        swRegistration.pushManager
            .getSubscription()
            .then(function (subscription) {
                isSubscribed = !(subscription === null);

                if (isSubscribed) {
                    // console.log("User IS subscribed.");
                } else {
                    // console.log("User is NOT subscribed.");
                    subscribeUser();
                }
            });
    }

    function subscribeUser() {
        const applicationServerKey = urlB64ToUint8Array(
            applicationServerPublicKey
        );
        swRegistration.pushManager
            .subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey,
            })
            .then(function (subscription) {
                // console.log("User is subscribed.");
                // console.log(JSON.stringify(subscription));
                updateSubscriptionOnServer(subscription);

                isSubscribed = true;

                // updateBtn();
            })
            .catch(function (err) {
                console.log("Failed to subscribe the user: ", err);
                // updateBtn();
            });
    }

    function updateSubscriptionOnServer(subscription) {
        Axios.post("/api/notifications/subscribe", subscription).catch(
            (err) => {
                console.log(err.message);
            }
        );
    }
};

export default pushInitialize;

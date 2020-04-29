self.addEventListener("push", function (event) {
    // console.log("[Service Worker] Push Received.");
    // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = "Jaaz.uz";
    const options = {
        body: `There are new questions available`,
        icon: "images/icon.png",
        badge: "images/badge.png",
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
    // console.log("[Service Worker] Notification click Received.");

    event.notification.close();

    event.waitUntil(clients.openWindow("https://jaaz.uz"));
});

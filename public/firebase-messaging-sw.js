importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBoWoAKptm-W4U2aW6j6HIg0BmzX-Q8tnM",
    authDomain: "notification-b689b.firebaseapp.com",
    projectId: "notification-b689b",
    storageBucket: "notification-b689b.appspot.com",
    messagingSenderId: "1037027150654",
    appId: "1:1037027150654:web:4c4124b1fb469d53657a6f",
    measurementId: "G-373CLJJ40C"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
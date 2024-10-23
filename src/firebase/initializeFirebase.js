import admin from "firebase-admin";
var serviceAccount = require("./retina-notify-firebase-adminsdk-un9kx-9c576b153b.json");

export const initializeFirebase = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};

export const sendFirebasePushNotifications = async (title, body, fcmToken) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: fcmToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      res.status(200).send("Notification sent successfully: " + response);
    })
    .catch((error) => {
      res.status(500).send("Error sending notification: " + error);
    });
};

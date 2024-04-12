import { initializeApp } from "firebase/app";
import { getMessaging,getToken} from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBoWoAKptm-W4U2aW6j6HIg0BmzX-Q8tnM",
    authDomain: "notification-b689b.firebaseapp.com",
    projectId: "notification-b689b",
    storageBucket: "notification-b689b.appspot.com",
    messagingSenderId: "1037027150654",
    appId: "1:1037027150654:web:4c4124b1fb469d53657a6f",
    measurementId: "G-373CLJJ40C"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async()=>{
    const permission= await Notification.requestPermission();
   if(permission==='granted'){
       const token = await getToken(messaging, {
           vapidKey: "BGu7K-DiA9zdzau9vTvTq4gXoxAhCYv1LugsU5n8-qg7xcrKh4WZhLmXlXao6oHKZtJi2fELjn32ESh2gb2kXmU"
       })
       if (token) {
        console.log(token)
        return token
   }
}
}
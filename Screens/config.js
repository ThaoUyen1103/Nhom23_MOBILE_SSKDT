// Import Firebase SDK cũ
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "AIzaSyBXwHgmp48HgeEUtdFE8jP7-ibF01Sx5no",
    authDomain: "nhom23sskdt.firebaseapp.com",
    projectId: "nhom23sskdt",
    storageBucket: "nhom23sskdt.firebasestorage.app",
    messagingSenderId: "816566960933",
    appId: "1:816566960933:web:bc8fd1dc21fefbcaf1d0cc",
    measurementId: "G-2LGXKQHKRT"
};

// Khởi tạo Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

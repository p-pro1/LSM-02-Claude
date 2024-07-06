import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBTVTUxhQhxQza3qaM3x2Nc0acpiU03aMI",
    authDomain: "lsm-event-site-2-claude.firebaseapp.com",
    projectId: "lsm-event-site-2-claude",
    storageBucket: "lsm-event-site-2-claude.appspot.com",
    messagingSenderId: "596056332316",
    appId: "1:596056332316:web:464d5f5464f2ba57c767d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
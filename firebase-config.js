// =====================================================
// PRO-MAX DMP
// BRIYANT SOLEY SIGNO 1815
// FIREBASE CONFIGURATION
// =====================================================

// Firebase SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

import { getFunctions } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-functions.js";

import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging.js";



// =====================================================
// FIREBASE CONFIG
// =====================================================

// REPLACE THE VALUES BELOW
// WITH YOUR OWN FIREBASE PROJECT SETTINGS

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_PROJECT.appspot.com",

messagingSenderId: "YOUR_MESSAGING_SENDER_ID",

appId: "YOUR_APP_ID",

measurementId: "YOUR_MEASUREMENT_ID"

};



// =====================================================
// INITIALIZE FIREBASE
// =====================================================

const app = initializeApp(firebaseConfig);



// =====================================================
// SERVICES
// =====================================================

const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

const functions = getFunctions(app);

const messaging = getMessaging(app);



// =====================================================
// EXPORTS
// =====================================================

export {

app,

analytics,

auth,

db,

storage,

functions,

messaging

};

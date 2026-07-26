// =====================================================
// PRO-MAX DMP - BRIYANT SOLEY SIGNO 1815
// FIREBASE CONFIGURATION - FINAL PRO-MAX
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics, isSupported as isAnalyticsSupported } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { getFunctions } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-functions.js";
import { getMessaging, isSupported as isMessagingSupported } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging.js";

// =====================================================
// FIREBASE CONFIG - pro-maxfm
// =====================================================
const firebaseConfig = {
  apiKey: "AIzaSyDCto1oqxOZ6nNtGRd_xu3x6GGwkmDgmjY",
  authDomain: "pro-maxfm.firebaseapp.com",
  projectId: "pro-maxfm",
  storageBucket: "pro-maxfm.firebasestorage.app",
  messagingSenderId: "1142157859255",
  appId: "1:1142157859255:web:2192af6e816d28e03f0032",
  measurementId: "G-PY7MDQ2WY3"
};

// =====================================================
// INITIALIZE
// =====================================================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// Services ki ka kraze yo, nou jere yo ak sekirite
let analytics = null;
let messaging = null;

isAnalyticsSupported().then(supported => {
  if (supported) {
    try { analytics = getAnalytics(app); } catch(e) { console.warn("Analytics pa aktive:", e.message) }
  }
});

isMessagingSupported().then(supported => {
  if (supported) {
    try { messaging = getMessaging(app); } catch(e) { console.warn("Messaging pa aktive:", e.message) }
  }
});

export {
  app,
  analytics,
  auth,
  db,
  storage,
  functions,
  messaging
};

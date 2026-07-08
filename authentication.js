// ============================================================
// PRO-MAX DMP
// BRIYANT SOLEY SIGNO 1815
// AUTHENTICATION SYSTEM
// ============================================================

import {
auth,
db
} from "./firebase-config.js";

import {

createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendPasswordResetEmail,
sendEmailVerification,
signOut,
onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {

doc,
setDoc,
getDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";



// ============================================================
// REGISTER
// ============================================================

export async function registerUser(

firstName,
lastName,
username,
email,
phone,
password,
role

){

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user = userCredential.user;

await sendEmailVerification(user);

await setDoc(

doc(db,"users",user.uid),

{

uid:user.uid,

firstName:firstName,

lastName:lastName,

username:username,

email:email,

phone:phone,

role:role,

status:"active",

emailVerified:false,

createdAt:serverTimestamp()

}

);

return user;

}



// ============================================================
// LOGIN
// ============================================================

export async function loginUser(

email,
password

){

const userCredential =
await signInWithEmailAndPassword(

auth,
email,
password

);

return userCredential.user;

}



// ============================================================
// RESET PASSWORD
// ============================================================

export async function resetPassword(

email

){

await sendPasswordResetEmail(

auth,
email

);

}



// ============================================================
// LOGOUT
// ============================================================

export async function logoutUser(){

await signOut(auth);

window.location.href="login.html";

}



// ============================================================
// CURRENT USER
// ============================================================

export function currentUser(callback){

onAuthStateChanged(

auth,

async(user)=>{

if(!user){

callback(null);

return;

}

const snap=await getDoc(

doc(db,"users",user.uid)

);

if(!snap.exists()){

callback(null);

return;

}

callback({

uid:user.uid,

...snap.data()

});

}

);

}



// ============================================================
// ROLE REDIRECT
// ============================================================

export function redirectUser(role){

switch(role){

case "super-admin":

window.location.href="admin-dashboard.html";

break;

case "admin":

window.location.href="dashboard.html";

break;

case "member":

window.location.href="member-portal.html";

break;

case "dj":

window.location.href="dj-portal.html";

break;

case "host":

window.location.href="host-portal.html";

break;

case "journalist":

window.location.href="journalist-manager.html";

break;

case "artist":

window.location.href="artist-manager.html";

break;

case "business":

window.location.href="business-manager.html";

break;

default:

window.location.href="dashboard.html";

}

}

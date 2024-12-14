// Import Firebase admin SDK, authenticate with service account JSON, initialise Firestore.
var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Initialise counters.
var createCounter = 0;
var retrieveCounter = 0;
var updateCounter = 0;
var deleteCounter = 0;

/**
 * Save creation counter increment to Firestore.
 */
async function saveCreateCounter(){
    createCounter++;
    await db.collection("counters").doc("createCounter").set({createCounter: createCounter});
}

/**
 * Save retrieval counter increment to Firestore.
 */
async function saveRetrieveCounter(){
    retrieveCounter++;
    await db.collection("counters").doc("retrieveCounter").set({retrieveCounter: retrieveCounter});
}

/**
 * Save update counter increment to Firestore.
 */
async function saveUpdateCounter(){
    updateCounter++;
    await db.collection("counters").doc("updateCounter").set({updateCounter: updateCounter});
}

/**
 * Save delete counter increment to Firestore.
 */
async function saveDeleteCounter(){
    deleteCounter++;
    await db.collection("counters").doc("deleteCounter").set({deleteCounter: deleteCounter});
}

// Export all functions and db.
module.exports = {
    db:db,
    saveCreateCounter: saveCreateCounter,
    saveRetrieveCounter: saveRetrieveCounter,
    saveUpdateCounter: saveUpdateCounter,
    saveDeleteCounter: saveDeleteCounter
};
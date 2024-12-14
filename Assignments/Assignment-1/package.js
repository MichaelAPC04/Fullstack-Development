class Package{
    /**
     * Package class constructor.
     * @param {string} pTitle 
     * @param {number} pWeight 
     * @param {string} pDest 
     * @param {string} pDesc 
     * @param {boolean} pIsAllocated 
     * @param {string} pDriverID 
     */
    constructor(pTitle, pWeight, pDest, pDesc, pIsAllocated, pDriverID){
        this.pId = generatePackageID();
        this.pTitle = pTitle;
        this.pWeight = pWeight;
        this.pDest = pDest;
        this.pDesc = pDesc;
        this.pIsAllocated = pIsAllocated;
        this.pDriverID = pDriverID;
        this.pCreatedAt = generatePackageDate();
    }
}

module.exports = Package;

/**
 * Generate the package's ID.
 * @returns {string} pID.
 */
function generatePackageID(){
    let char = String.fromCharCode(65 + Math.floor(Math.random() * 26));    // Send random char to string from A-Z.
    let pID = "P" + char + char + "-MC-" + Math.floor(Math.random() * 1000).toString();  // Generate 2 random chars and 3 numbers.
    return pID;
}

/**
 * Generate the current date.
 * @returns {Date} date.
 */
function generatePackageDate(){
    let date = new Date();
    return date;    // Generate and return current date.
}
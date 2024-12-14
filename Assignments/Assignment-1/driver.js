class Driver{
    /**
     * Driver class constructor.
     * @param {string} dName 
     * @param {string} dDepartment 
     * @param {string} dLicense 
     * @param {boolean} dIsActive 
     */
    constructor(dName, dDepartment, dLicense, dIsActive){
        this.dId = generateDriverID();
        this.dName = dName;
        this.dDepartment = dDepartment;
        this.dLicense = dLicense;
        this.dIsActive = dIsActive;
        this.dDate = generateDriverDate();
    }
}

module.exports = Driver;

/**
 * Generate the Driver's ID.
 * @returns {string} dID
 */
function generateDriverID(){
    let char = String.fromCharCode(65 + Math.floor(Math.random() * 26));    // Send random char to string from A-Z.
    let dID = "D" + Math.floor(Math.random() * 100).toString() + "-33-" + char + char + char;   // Generate 2 random numbers and 3 chars.
    return dID;
}

/**
 * Generate the current date.
 * @returns {Date} date
 */
function generateDriverDate(){
    let date = new Date();
    return date;    // Generate and return current date.
}
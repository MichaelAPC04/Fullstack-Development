class Teacher {
    constructor(tName, tSalary, tRank){
        this.tName = tName;
        this.tSalary = tSalary;
        this.tRank = tRank;
        this.id = Math.round(Math.random() * 100000);
    }
}

module.exports = Teacher;
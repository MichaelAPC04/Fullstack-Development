export class Driver{
    _id: string;
    dId: string;
    dName: string;
    dDepartment: string;
    dLicense: string;
    dIsActive: boolean;
    dDate: Date;
    dAssignedPackages: Array<any>;

    constructor(){
        this._id = '';
        this.dId = '';
        this.dName = '';
        this.dDepartment = '';
        this.dLicense = '';
        this.dIsActive = false;
        this.dDate = new Date();
        this.dAssignedPackages = [];
    }
}

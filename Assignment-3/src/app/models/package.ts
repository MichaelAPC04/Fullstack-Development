export class Package{
    _id: string;
    pId: string;
    pTitle: string;
    pWeight: number;
    pDest: string;
    pDesc: string;
    pIsAllocated: boolean;
    pDriverID: string;
    pCreatedAt: Date;

    constructor(){
        this._id = '';
        this.pId = '';
        this.pTitle = '';
        this.pWeight = 0;
        this.pDest = '';
        this.pDesc = '';
        this.pIsAllocated = false;
        this.pDriverID = '';
        this.pCreatedAt = new Date();
    }
}
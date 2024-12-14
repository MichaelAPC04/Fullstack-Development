export class Veggie{

    name: string;
    cost: number;
    vID: string;

    constructor(){
        this.name = "";
        this.cost = 0;
        this.vID = generateVID();
    }
    
}

function generateVID(){
    let vID = Math.floor(Math.random() * 1000).toString(); 
    return vID;
}
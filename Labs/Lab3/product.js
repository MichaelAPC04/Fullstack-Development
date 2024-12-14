class Product{
    constructor(pName, pCategory, pCost){
        this.id = Math.round(Math.random()*10000000);
        this.pName = pName;
        this.pCategory = pCategory;
        this. pCost = pCost;
    }
}

module.exports = Product;
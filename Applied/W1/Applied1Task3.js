let car = {
    make: "BMW",
    model: "X7",
    'year': 2021
};

let ar = [2,8,1,0];
//console.log(ar[0]);
//console.log(car.make);

let fleet = [];

function generateFleet(n){
    let aFleet = [];
    for(let i=0;i<n;i++){
        let randModel = Math.round(Math.random()*7);
        let randYear = Math.round(Math.random()*25) + 2000;
        let obj = {
            make: "BMW",
            model: "X" + randModel,
            year: randYear
        };
        aFleet.push(obj);
    }
    return aFleet;
}

fleet = generateFleet(5);
console.log(fleet);
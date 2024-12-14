// function count(ar, elem){
//     let counter=0;
//     for(let i=0;i<ar.length;i++){
//         if(ar[i]===elem)
//             counter++;
//     }
//     return counter;
// }
// var array=[1,6,3,8,9,2,1,6,1];
// console.log(count(array,1));    

// var x = 3;
// x = x + 3;
// y = x / 2;
// console.log(y);

// var ar = [1, 2, 3, 4, 5];
// ar.push(6);
// ar.pop(3);
// console.log(ar);

let obj = {
    name: "John",
    age: 30,
    city: "New York"
};

let obj2 = {
    name: "Jane",
    age: 25,
    city: "Boston"
};

var animals = []
animals.push(obj, obj2);

animals[1] = {
    name: "Alice",
    age: 35
}

for(let i = 2; i >= 0; i--){
    console.log(animals[i]);
}

// console.log(animals);
// console.log(obj.name);
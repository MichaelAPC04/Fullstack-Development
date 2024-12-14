var ar = [3,5,6,3,2,1];


// camel case convention here
function printMe(ar){
    for(let i = 0; i<ar.length; i++){
        // console.log("(" + i + ") ---> " + ar[i]);
        if(ar[i] % 2 === 0)
            console.log(`(${i}) ---> ${ar[i]}`);
    }

}

function countEvenNumbers(ar){
    let counter = 0;
    // for(let i=0;i<ar.length;i++){
    //     if(ar[i] % 2 === 0)
    //         counter++;
    // }
    for(let item of ar){
        if(item % 2 === 0)
            counter++;
    }

    return counter;
}

//printMe(ar);
console.log(countEvenNumbers(ar));

class Queue {
    constructor() {
        this.q = [];
    }
// get the current number of elements in the queue
//Getter function
    get length() {
        return this.q.length
    };
//Get all the elements 
    get queue() {
        return this.q;
    }
// Boolean function: returns true if the queue is empty, false otherwise 
    isEmpty() {
        return 0 == this.q.length;
    };
//adds new element to the end of the quue
    enqueue(newItem) {
        this.q.push(newItem)
    };
//Boolean function: returns true if an item is found (first occurnace); false otherwise
    inQueue(item) {
        let i = 0;
        let isFound = false;
        while (i < this.q.length && !isFound) {
            if (this.q[i] === item) {
                isFound = true;
            } else
                i++;
        }
        return (isFound);
    }
// pop an item from the queue
    dequeue() {
        if (0 != this.q.length) {
            let c = this.q[0];
            this.q.splice(0, 1);
            return c
        }
    };

    clearqueue() {
        this.q = [];
    }

    addAll(args){
        this.q.push(...args);
        // for (let item of args){
        //     this.q.push(item);
        // }
    }

    ndequeue(n){
        if(this.q < n){
            console.log("Not enough elements in the array.");
        }

        while(n >= 0, n--){
            this.q.pop();
        }
    }

    printqueue(){
        for(let i = 0; i < this.q.length; i++){
            console.log("Element " + i + " ---> " + this.q[i]);
        }
    }   

};

let queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.length);
console.log(queue.q);
queue.dequeue();
queue.enqueue(33);
console.log(queue.q);
console.log(queue.inQueue(33));
console.log(queue.inQueue(88));
queue.printqueue();
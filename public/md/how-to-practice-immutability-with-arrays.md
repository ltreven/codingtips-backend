## How to practice immutability with arrays

### How to practice immutability with arrays 

As we know, in Javascript arrays and objects are not immutable. If you really need to keep them immutable you can use those tips to add, update and remove elements of an array, generating a new one:

### Adding
```
// let's add a number 4 before number 2
let number = [1, 2, 3];
let idx = number.indexOf(2);

// use Spread operator in order not to have an arrays of arrays
// slice creates a new array from 0 to last element before idx
let newArray = [...numbers.slice(0, idx), 4, ...numbers.slice(idx)];
```

### Updating
```
// let's change 2 by 20
let newArray = numbers.map(n => (n===2 ? 20 : n))
```

### Removing
```
// let's remove 2:
let newArray = numbers.filter(n => n !== 2);
```

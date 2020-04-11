## Destructuring Assignment

### Returning many values and creating many variables

You can create two or more variables from the returning value of a function using destructuring assignment.

```
function f() {
  return [1, 2];
}

let a, b; 
[a, b] = f(); 
console.log(a); // 1
console.log(b); // 2
```

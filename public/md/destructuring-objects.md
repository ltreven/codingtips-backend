## Destructuring Assignment

### Create many variables from an object with destructuring

You can create many variables at once from an object using destructuring assignment.

```
// this is the same as `var a = 10;` and `var b = 20`
// parenthesis here are mandatory
({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20

// use const without the parenthesis to create constants `c`and `d`
const {c, d} = { c: 200, d: 400, e: 600};
console.log(c); // 200
console.log(d); // 400
```

## Apply Method

### Bind the "this" parameter to another object 

The apply method allows manual invocation of a function.
It is a hidden method of every function, so we can call it by adding .apply() and passing two parameters:

- An object to bind the **this** parameter to
- An array which is mapped as **arguments**

```
let myObject = {
    anyProperty: "prop value",
    myFunction: function(a, b, c) {
        console.log( arguments );
        console.log( this );
    }
};

myObject.myFunction(1, 2, 3);
// myFunction is considered a method. The 'this' keyword will be bind to 'myObject'.
// expected return:
// ==> Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// ==> {anyProperty: "prop value", myFunction: ƒ}

let anotherObject = {
    otherProp: "other prop value",
};

myObject.myFunction.apply(anotherObject, [4, 5, 6]);
// Using apply the 'this' keyword will point to 'anotherObject'.
// ==> Arguments(3) [4, 5, 6, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// ==> {otherProp: "other prop value"}
```
Observe than console.log( arguments ) prints the content of the function's arguments.
The 'arguments' keyword will be always available inside functions to describe the arguments passed to it.

### Apply x Call

Call method is very similar to "apply", but instead of passing an array of arguments, you will have to pass them all, separated by commas.
```
Function.call(this, param1, param2, param 3,... )
Function.apply(this, [param1, param2, param 3, ...])
```
The apply method has the advantage of making possible to iterate the arguments array. 

## How to keep immutability 

### How to keep immutability of objects and arrays in Javascript 

As we know, in Javascript arrays and objects are not immutable. If you really need to keep them immutable you can use either Onbject.assign( ) or the **spread** operator.

```
let person = { name: "Lourenço" };
ler other = Object.assign({}, person, {name: "John", age: 35})

// newer properties will override the spread operator:
let another = {...person, name: "Mary", age: 40}
```

## Destructuring Assignment

### How to break an URL into its parts using Regex and destructuring

To split the URL and assign each portion to a specific variables, you can use Regular Expressions and Destructuring Assignment

```
const url = "https://getbootstrap.com/docs/4.4/components/toasts/";

// if it is not possible to split, splitedUrl will be null.
const splitedUrl = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);

console.log(splitedUrl);
// expected: ["https://getbootstrap.com/docs/4.4/components/toasts/", "https", "getbootstrap.com", "docs/4.4/components/toasts/"]

// create variables, only the useful ones :)
const [, protocol, host, path] = splitedUrl;
```

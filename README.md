#

## Problem 1

Write a function `sum(arr)` that accepts an array of data.

### Example:

```js
//  should return 13.2
sum([1, 'x', '2.2x', ['3', ['x2', '5']]]);
```

## Problem 2

We have a global configuration object with nested values with unknown structure. Also we have a patch object with unknown structure.

Write a function `processOverrides(o1, o2)` which takes two objects and returns new object equal to `o1` patched with `o2` but only for keys or key sequences given in the `o1["patchable"]`. Result should not include `patchable` key/value pair itself.

Cover this function with comprehensive tests.

### Example:

```js
//  should return {'1': 2, 'a': {'3': 100}}
processOverrides({ 1: 2, a: { 3: 4 }, patchable: ["a.3"] }, { a: { 3: 100 } });
```

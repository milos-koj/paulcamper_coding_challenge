/**
 * convert path string into array
 * @param {string} path path
 * @returns {string[]} array
 */
function convertPath(path) {
  return path
    .replace(/^\./, "") // strip a leading dot
    .split(".")
    .reduce((array, key) => {
      const braceIndex = key.indexOf("[");
      if (braceIndex >= 0) {
        array.push(key.slice(0, braceIndex));

        let k = key.slice(braceIndex + 1, -1);
        if (k) {
          if (/^[0-9]+$/.test(k)) {
            k = parseInt(k);
          }
          array.push(k);
        }
      } else {
        array.push(key);
      }
      return array;
    }, []);
}

/**
 * get the value from object with provided path
 * @param {object} object object
 * @param {string | string[]} path path
 * @param {object} options options
 * @param {boolean} options.create if true, then create if not exist
 * @param {boolean} options.defaultValue return this value if not exists. also if `options.create` is enabled, set with this value if not exists
 * @returns {any} value
 */
function get(object, path, options = {}) {
  if (!path || (Array.isArray(path) && path.length === 0)) {
    return object;
  }

  const pathArray = Array.isArray(path) ? path : convertPath(path);

  let value = object;
  for (let i = 0; i < pathArray.length; i += 1) {
    const key = pathArray[i];
    const prevPath = i > 0 ? pathArray.slice(0, i).join(".") : "first param";

    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      if (!options.create) {
        throw new Error(`"${key}" is not exists in "${prevPath}"`);
      }

      if (typeof key === "number") {
        value[key] = [];
      } else {
        value[key] = {};
      }

      if (
        i === pathArray.length - 1 &&
        Object.prototype.hasOwnProperty.call(options, "defaultValue")
      ) {
        value[key] = options.defaultValue;
      }
    }

    value = value[key];
  }

  return value;
}

/**
 * set the value to object with provided path
 * @param {object} object object
 * @param {string | string[]} path path
 * @param {any} value value
 * @returns {void}
 */
function set(object, path, value) {
  if (typeof object !== "object") {
    return object;
  }

  if (!path) {
    return object;
  }

  const pathArray = convertPath(path);
  const lastKey = pathArray.pop();

  const instance = get(object, pathArray, {
    defaultValue: typeof lastKey === "number" ? [] : {},
    create: true,
  });

  instance[lastKey] = value;

  return object;
}

// console.log(set(obj, "a.b", "no"));
// console.log(set(obj, "a.b.c", "no"));
// console.log(set(obj, "a.b1", "no"));
// console.log(set(obj, "a.b1[0]", "no"));
// console.log(set(obj, "a.b1[1]", "no"));
// console.log(set(obj, ".a.b2", "no"));
// console.log(set(obj, "a1[0]", "no"));
// console.log(set(obj, "a1[1].b2", "no"));

function processOverrides(source, overrides) {
  const patchable = source.patchable;
  delete source.patchable;

  if (!patchable || !patchable.length) return source;

  for (let i = 0; i < patchable.length; i += 1) {
    const path = patchable[i];

    try {
      set(source, path, get(overrides, path));
    } catch (error) {
      // ignore error
      //   console.error(error);
    }
  }

  return source;
}

module.exports = {
  convertPath,
  get,
  set,
  processOverrides,
};

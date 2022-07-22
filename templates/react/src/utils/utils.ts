function isObject(value: any) {
  return typeof value === 'object' && value !== null;
}

function isValidValue(value: any) {
  return value !== undefined && value !== null;
}

export function getIn(value: any, keys: Array<string>, defaultValue: any): any {
  if (!Array.isArray(keys)) throw new Error('keys must be typeof array');
  if (!isObject(value)) return defaultValue;

  const key = keys.shift();
  if (value.hasOwnProperty(key)) {
    if (!keys.length) {
      return isValidValue(value[key!]) ? value[key!] : defaultValue;
    } else {
      return getIn(value[key!], keys, defaultValue);
    }
  }

  return defaultValue;
}

/**
 *
 * @param {?Object} obj
 * @param {Array.<*>} keyPath
 * @param {*} defaultValue if not given, defaultValue is `undefined`
 * @return {*}
 *
 * example:
 * res = { data: { pic: 'xxx' }}
 * console.log(getIn(res, ['data','pic'], 'defaultValue'));
 */
export default function getIn(obj: any, keyPath: string[], defaultValue?: any): any {
  if (Array.isArray(keyPath) && keyPath.length) {
    const key = keyPath[0];
    if (!obj || !obj[key]) {
      return defaultValue;
    }
    return getIn(obj[key], keyPath.slice(1) as any, defaultValue);
  }
  return obj;
}

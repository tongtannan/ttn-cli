export function getCommonRuleResult(data, ruleList): boolean {
  for (let i = 0, len = ruleList.length; i < len; i++) {
    const { type, key, children } = ruleList[i];
    const value = data[key];
    switch (type) {
      case 'string':
        if ([undefined, ''].includes(value)) return false;
        break;

      case 'array':
        if (!value || !value.length) return false;

        if (children) {
          for (let l = 0, llen = value.length; l < llen; l++) {
            const res = getCommonRuleResult(value[l], children);
            if (!res) return false;
          }
        }
        break;

      default:
        break;
    }
  }

  return true;
}

export function formatMap(data, label = 'label', value = 'value', needNumber = true): any {
  return Object.keys(data).map((key) => ({
    [label]: data[key],
    [value]: needNumber ? Number(key) : key,
  }));
}

export function debounce(fn, waiting = 200) {
  let timer = null;
  // eslint-disable-next-line
  return function (...args) {
    // eslint-disable-next-line
    let context = this;
    if (timer) clearTimeout(timer);
    // eslint-disable-next-line
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, waiting);
  };
}

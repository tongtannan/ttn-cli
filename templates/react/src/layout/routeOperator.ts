import { getRouter } from '../router/helper';

const router = getRouter();

export const getParentKeys = (key: string): string[] => {
  let mres: string[] = [];
  (function iterate(arr, res) {
    arr.forEach((item) => {
      const cres = [...res];
      if (item.path === key) {
        !item.innerRouter && cres.push(item.path);
        mres = cres;
      } else if (item.children) {
        cres.push(item.path);
        iterate(item.children as any, cres);
      }
    });
  })(router, []);
  return mres.length > 0 ? mres : [];
};

interface Path {
  text: string;
  path: string;
}

export const getBreadcrumb = (key: string): Array<Path> => {
  let mres: Array<Path> = [];
  (function iterate(arr, res) {
    arr.forEach((item) => {
      const cres = [...res];
      if (item.path === key) {
        cres.push({ text: item.text, path: item.component && item.path });
        mres = cres;
      } else if (item.children) {
        cres.push({ text: item.text, path: item.component && item.path });
        iterate(item.children as any, cres);
      }
    });
  })(router, []);
  return mres;
};

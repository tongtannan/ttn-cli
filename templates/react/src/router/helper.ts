import { HomeTab, ShardingTab, RouterConfig } from './router.config';
import { PermissionKeys } from '@/constants/type.d';

const router = [];
let flattenedRouter = [];

const flattenRouter = (arr: RouterConfig[]): any[] => {
  let flatted = [];
  for (let i = 0; i < arr.length; i++) {
    const currentPath = arr[i].path;
    if (arr[i].component) {
      flatted.push({ ...arr[i], path: currentPath });
    }
    if (arr[i].children) {
      flatted = flatted.concat(flattenRouter(arr[i].children));
    }
  }
  return flatted;
};

export const initRouter = (permissions) => {
  // permissions.includes(PermissionKeys.TEST_MANAGEMENT_MGMT_READ) && router.push(HomeTab);
  router.push(HomeTab);
  router.push(ShardingTab);
  flattenedRouter = flattenRouter(router);
};

export const getRouter = (): any[] => router;
export const getFlattenRouter = (): any[] => flattenedRouter;

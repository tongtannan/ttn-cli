import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import LazyLoader from './LazyLoader';
import { RoutePath, ComponentMap, RouterFlatten, Route } from './type.d';

const Home = LazyLoader(() => import('../pages/Home/index'));
const Second2 = LazyLoader(() => import('../pages/First/Second2/index'));
const Third1 = LazyLoader(() => import('../pages/First/Second1/Third1/index'));

const componentMap: ComponentMap = {
  [RoutePath.HOME]: Home,
  [RoutePath.SECOND_SECOND]: Second2,
  [RoutePath.THIRD_ONE]: Third1,
};

const routers: Route[] = [
  {
    label: 'Home',
    icon: AppstoreOutlined,
    path: RoutePath.HOME,
  },
  {
    label: 'First',
    icon: ContainerOutlined,
    path: RoutePath.FIRST,
    children: [
      {
        label: 'Second1',
        icon: DesktopOutlined,
        path: RoutePath.SECOND_ONE,
        children: [
          {
            label: 'Third1',
            icon: PieChartOutlined,
            path: RoutePath.THIRD_ONE,
          },
        ],
      },
      {
        label: 'Second2',
        icon: MailOutlined,
        path: RoutePath.SECOND_SECOND,
      },
    ],
  },
];

const routerFlatten: RouterFlatten[] = [];
const flattenFn = (routers: Route[], parentPath: string, keys: Array<string>) => {
  routers.forEach((r) => {
    const path = `${parentPath}${r.path}`;
    keys.push(path);
    routerFlatten.push({
      path,
      keys,
      component: componentMap[r.path],
    });
    r.children?.length && flattenFn(r.children, path, keys.slice());
    keys.pop();
  });
};
flattenFn(routers, '', []);

export { routers, routerFlatten };

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
const Third1Detail = LazyLoader(() => import('../pages/First/Second1/Third1/detail'));

const componentMap: ComponentMap = {
  [RoutePath.HOME]: Home,
  [RoutePath.SECOND_2]: Second2,
  [RoutePath.THIRD_1]: Third1,
  [RoutePath.THIRD_1_DETAIL]: Third1Detail,
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
    children: [
      {
        label: 'Second1',
        icon: DesktopOutlined,
        children: [
          {
            label: 'Third1',
            icon: PieChartOutlined,
            path: RoutePath.THIRD_1,
            children: [
              {
                path: RoutePath.THIRD_1_DETAIL,
                hide: true,
              },
            ],
          },
        ],
      },
      {
        label: 'Second2',
        icon: MailOutlined,
        path: RoutePath.SECOND_2,
      },
    ],
  },
];

const routerFlatten: RouterFlatten[] = [];
const flattenFn = (routers: Route[], keys: Array<string>, parentPath: string) => {
  routers.forEach((r) => {
    const { path } = r;
    !r.hide && keys.push(r.path || '');
    path &&
      routerFlatten.push({
        path,
        parentPath,
        keys: path.split('/'),
        hide: r.hide,
        component: path ? componentMap[path] : null,
      });
    r.children?.length && flattenFn(r.children, keys, path || '');
    keys.pop();
  });
};
flattenFn(routers, [], '');

export { routers, routerFlatten };

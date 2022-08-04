import React, { FC, ReactNode, Key, useEffect, useState, memo } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

import { routers, routerFlatten } from '@/router/router.config';
import { Route } from '@/router/type.d';
import UseHistory from '@/router/UseHistory';
import requestCancel from '@/utils/requestCancel';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: ReactNode, key: Key, icon?: ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const formatRoutes = (routes: Route[] = []): MenuItem[] => {
  const isEmpty = !routes?.length;
  const allHide = routes?.length && routes.every((route) => route.hide);
  // @ts-ignore
  if (isEmpty || allHide) return null;

  return routes.map((route: Route) => {
    const children = formatRoutes(route.children);
    return route.hide ? null : getItem(route.label, route.path || '', route.icon?.render(), children);
  });
};
const items: MenuItem[] = formatRoutes(routers);

const App: FC = () => {
  const { push, href } = UseHistory();
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);

  useEffect(() => {
    const item = routerFlatten.find((item) => item.path === href.pathname);
    if (item) {
      console.log('href', href, item);
      setSelectedKeys(!item.hide ? [href.pathname] : [item.parentPath]);
      setOpenKeys(item?.keys || []);
    }
  }, []);

  useEffect(() => {
    // 路由变化，清空之前的get请求
    requestCancel.cancelRequest();
  }, [href.pathname]);

  const handleClickMenu = ({ key }: any) => {
    if (key === href.pathname) return;
    setSelectedKeys([key]);
    push(key);
  };

  const handleOpenChange = (openKeys: string[]) => setOpenKeys(openKeys);

  return (
    <div style={{ width: '100%' }}>
      <Menu
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        mode="inline"
        items={items}
        onClick={handleClickMenu}
        onOpenChange={handleOpenChange}
      />
    </div>
  );
};

export default memo(App);

import React from 'react';
import { SettingOutlined, ShareAltOutlined } from '@ant-design/icons';

import createContainer from './lazyLoader';
/**
 * Router configuration supports a tree structure to configure routing. The first two nodes of the routing tree will be rendered to the navigation bar. You can add the innerRouter attribute to avoid rendering.
 * Each layer of routing needs to configure the attributes
 * key（required）
 * text（display text，required）
 * path（
 *  Single layer routing（don't allow /asd/asdads，only /asd），required。
 *  If you need to use /user/test as the path, please use an object package containing path, key, and children (if text is not provided, it will not be rendered in breadcrumbs)
 *  The path will be assembled downward from the root node.
 *  Support the routing parameter /:id of react-router.
 *  It should be noted that if a node path is a routing parameter, the node cannot have sibling nodes, but can have child nodes, pay attention to configure the exact attribute by yourself
 * ）
 * component（Rendering component. If this property is not configured, the link rendered by clicking on the node will not be adjusted, and the breadcrumb will appear as unclickable text）
 * exact（react-router exact）
 * icon（antd icon, only the first layer will be rendered）
 * children（Build a tree structure）
 * innerRouter（Avoid rendering in navigate）
 */
export interface RouterConfig {
  key: string;
  text: string;
  path: string;
  exact?: boolean;
  crumbText?: string;
  innerRouter?: any;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  children?: RouterConfig[];
}
const Home = createContainer(() => import('../pages/Home'));

const Sharding = createContainer(() => import('../pages/Sharding'));

export const HomeTab = {
  text: 'Product Management',
  icon: SettingOutlined,
  path: '/',
  exact: true,
  component: Home,
};

export const ShardingTab = {
  text: 'Sharding',
  icon: ShareAltOutlined,
  path: '/sharding',
  component: Sharding,
};

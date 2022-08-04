import { ClassType, Component, ReactNode } from 'react';

export enum RoutePath {
  HOME = '/',
  SECOND_2 = '/first/second2',
  THIRD_1 = '/first/second1/third1',
  THIRD_1_DETAIL = '/first/second1/third1/detail',
}

export type ComponentMap = {
  [key in RoutePath]?: U;
};

export type RouterFlatten = {
  path?: string;
  parentPath: string;
  keys: Array<string>;
  hide?: boolean;
  component: ReactNode;
};

export type Route = {
  path?: RoutePath;
  icon?: React.ClassType<any, any, any>;
  label?: string;
  hide?: boolean;
  children?: Array<Route>;
};

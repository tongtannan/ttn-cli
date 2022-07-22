import { ClassType, Component, ReactNode } from 'react';

export enum RoutePath {
  HOME = '/',
  FIRST = '/first',
  SECOND_ONE = '/second1',
  SECOND_SECOND = '/second2',
  THIRD_ONE = '/third1',
}

export type ComponentMap = {
  [key in RoutePath]?: U;
};

export type RouterFlatten = {
  path: string;
  keys: Array<string>;
  component: ReactNode;
};

export type Route = {
  path: RoutePath;
  icon?: React.ClassType<any, any, any>;
  label: string;
  hide?: boolean;
  children?: Array<Route>;
};

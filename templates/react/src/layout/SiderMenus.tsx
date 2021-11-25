import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Menu } from 'antd';

import { getRouter } from '../router/helper';
import { getParentKeys } from './routeOperator';

const { SubMenu } = Menu;

export interface Props extends RouteComponentProps {
  collapsed: boolean;
}

class SiderMenus extends React.Component<Props> {
  navigate = (path) => {
    this.props.history.push(path);
  };

  getSubMenuItems = (config: any) => {
    const itemText = (
      <>
        {config.icon ? <config.icon /> : null}
        {config.text}
      </>
    );

    const renderChilds = (config.children || []).filter((c) => !c.innerRouter);

    if (!config.children || !renderChilds.length) {
      return (
        <Menu.Item title={config.text} key={config.path}>
          {config.icon && <config.icon />}
          <span>{config.text}</span>
        </Menu.Item>
      );
    }

    return (
      <SubMenu key={config.path} title={itemText}>
        {config.children.map((child) => (
          <Menu.Item title={child.text} key={child.path}>
            {child.icon && <child.icon />}
            <span>{child.text}</span>
          </Menu.Item>
        ))}
      </SubMenu>
    );
  };

  generateMenuItem = () => {
    const items = getRouter().map((config: any) => {
      const itemText = (
        <>
          {config.icon ? <config.icon /> : null}
          {this.props.collapsed || config.text}
        </>
      );

      if (config.innerRouter) {
        return null;
      }
      const renderChilds = (config.children || []).filter((c) => !c.innerRouter);

      if (!config.children || !renderChilds.length) {
        return (
          <Menu.Item key={config.path} title={config.text}>
            {itemText}
          </Menu.Item>
        );
      }
      return (
        <SubMenu key={config.path} title={itemText}>
          {renderChilds.map(this.getSubMenuItems)}
        </SubMenu>
      );
    });

    return items;
  };

  handleMenuItemClick = (opts) => {
    this.navigate(opts.key);
  };

  render() {
    const {
      location: { pathname },
    } = this.props;
    const parentKeys = getParentKeys(pathname);

    return (
      <Menu
        mode="inline"
        theme="light"
        selectedKeys={parentKeys}
        defaultOpenKeys={parentKeys}
        onClick={this.handleMenuItemClick}
        style={{
          height: '100%',
          paddingBottom: '42px',
          overflow: 'auto',
        }}
      >
        {this.generateMenuItem()}
      </Menu>
    );
  }
}

export default withRouter(SiderMenus);

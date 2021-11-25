import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Menu, Dropdown, Avatar, message } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, CaretDownOutlined } from '@ant-design/icons';

import NotFound from '@/pages/NotFound';
import { Loading } from '@/components';
import logo from '@/images/logo.png';
import RouterContent from './RouterContent';
import SiderMenus from './SiderMenus';

import dataStore from '@/DataStore';
import request from '@/utils/request';
import { logout } from '@/utils';
import { initRouter } from '../router/helper';

import styles from './index.less';

const { Header, Sider, Content } = Layout;
type Props = Record<string, unknown>;

type State = {
  loading: boolean;
  isSidebarCollapsed: boolean;
  error: boolean;
};

export default class ShopeeLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      isSidebarCollapsed: false,
    };
  }

  signOut = async () => {
    const [e] = await logout();
    if (e) {
      return message.error(e.message || 'Sign out error');
    }
    window.location.reload();
  };

  getMenu = () => (
    <Menu onClick={this.signOut}>
      <Menu.Item>Sign out</Menu.Item>
    </Menu>
  );

  async componentDidMount() {
    await new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(null);
      }, 100);
    });
    const [e, res] = await request('/v1/agent/userinfo');
    initRouter(res?.permissions);
    // const permissions = getIn(res || {}, ['permissions']) || [];
    if (e && e.message === 'redirect') {
      // Special handling for the need to log in and jump
      return;
    }
    if (!e) {
      dataStore.initData(res || {});
    }
    this.setState({
      loading: false,
    });
    // this.setState({
    //   loading: false,
    //   error: e || !permissions.length,
    // });
  }

  render() {
    const { loading, isSidebarCollapsed, error } = this.state;
    if (error) {
      return (
        <Layout className={styles.rootLayout}>
          <div style={{ marginTop: '150px' }}>
            <NotFound />
          </div>
        </Layout>
      );
    }

    if (loading) {
      const spinContainerStyle = {
        width: '100%',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '0px',
      };
      return <Loading style={spinContainerStyle} />;
    }

    const userInfo = dataStore.getUserInfo();

    return (
      <Layout className={styles.rootLayout}>
        <Router>
          <Header className={styles.rootHeader}>
            <img style={{ position: 'relative', top: '-2px', width: '20px' }} alt="logo" src={logo} />
            <span
              style={{
                fontSize: '18px',
                position: 'relative',
                left: '14px',
                top: '2px',
              }}
            >
              React Platform Admin
            </span>

            <div className={styles.userInfo}>
              <Avatar size={24} style={{ marginRight: '8px' }} src={userInfo.avatar} />
              <Dropdown overlay={this.getMenu()} trigger={['click']}>
                <span style={{ cursor: 'pointer' }}>
                  {userInfo.username} <CaretDownOutlined style={{ position: 'relative', top: '1px' }} />
                </span>
              </Dropdown>
            </div>
          </Header>
          <Layout>
            <Sider collapsed={isSidebarCollapsed} width={240} className={styles.rootSider}>
              <SiderMenus collapsed={isSidebarCollapsed} />
              <div className={styles.triggerWrap}>
                {React.createElement(isSidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: styles.trigger,
                  onClick: () => this.setState({ isSidebarCollapsed: !isSidebarCollapsed }),
                })}
              </div>
            </Sider>
            <Content className={styles.rootContent}>
              <RouterContent />
            </Content>
          </Layout>
        </Router>
      </Layout>
    );
  }
}

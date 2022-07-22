import React, { Component } from 'react';
import { Layout, Button, Spin } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import RouteContent from './Content';
import SiderContent from './Sider';
import { getUserinfo } from '@/api/index';
import styles from './index.less';

const { Header, Footer, Sider, Content } = Layout;

type Props = {};
type State = {
  loading: boolean;
  collapsed: boolean;
};

export default class Index extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      collapsed: false,
    };
  }

  toggleCollapsed = () =>
    this.setState({
      collapsed: !this.state.collapsed,
    });

  async componentDidMount() {
    // const res = await getUserinfo({});
    // console.log('res', res);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, collapsed } = this.state;

    if (loading)
      return (
        <div className={styles.loading}>
          <Spin size="large" />
        </div>
      );

    return (
      <Layout>
        <Header className={styles.header}>
          <span className={styles.headerTitle}>Header</span>
        </Header>
        <Layout className={styles.layoutContent}>
          <Sider className={styles.sider} collapsed={collapsed}>
            <SiderContent />
            <Button onClick={this.toggleCollapsed} className={styles.siderCollapsedButton}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </Sider>
          <Content>
            <RouteContent />
          </Content>
        </Layout>
        <Footer className={styles.footer}>
          <span className={styles.footerTitle}>Footer</span>
        </Footer>
      </Layout>
    );
  }
}

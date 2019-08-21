import React from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.css';
import router from 'umi/router';

const { Header, Content, Sider } = Layout;

class BasicLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {

    const { children, location: { pathname } } = this.props

    return (
      <div className={styles.basicLayout}>
        {
          pathname.indexOf("login") !== -1 ?
            (
              <Layout>
                {children}
              </Layout>
            ) : (
              <Layout className={styles.primaryLayout} >
                <Sider trigger={null} width={200} collapsible collapsed={this.state.collapsed} theme='light' >
                  <div className={styles.logo} />
                  <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="light"
                  >
                    <Menu.Item key="1" onClick={() => { router.push('/index') }}>
                      <Icon type="home" />
                      <span>Index</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => { router.push('/login') }}>
                      <Icon type="user" />
                      <span>Login</span>
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Layout>
                  <Header style={{ background: '#fff', padding: 0 }}>
                    <Button className={styles.trigger} onClick={this.toggle} >
                      <Icon
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      />
                    </Button>
                  </Header>
                  <Content
                    style={{
                      margin: '24px 16px',
                      padding: 24,
                      background: '#fff',
                      minHeight: 280,
                    }}
                  >
                    {children}
                  </Content>
                </Layout>
              </Layout>
            )
        }
      </div >
    );
  }
};

export default BasicLayout;

import React from 'react';
import { Layout, Menu, Icon, Button, Dropdown, Row, Col } from 'antd';
import { connect } from "dva"
import 'antd/dist/antd.css';
import styles from './index.css';
import router from 'umi/router';
import { Link } from 'umi';

const { Header, Content, Sider } = Layout;

const menu = (
  <Menu >
    <Menu.Item key="1" onClick={()=>{router.push("/login")}}>
      <Icon type="logout" />
      logout
    </Menu.Item>
  </Menu>
);

const mapStatetoPorps = ({ user }) => {
  const { username } = user
  return {
    username
  }
}

@connect(mapStatetoPorps)
class BasicLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      siderWidth: '200px',
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      siderWidth: this.state.collapsed ? '40px' : '200px'
    });
  };

  render() {

    const { children, location: { pathname }, username } = this.props
    const {collapsed, siderWidth} = this.state

    return (
      <div className={styles.basicLayout}>
        {
          pathname.indexOf("login") !== -1 ?
            (
              <Layout>
                {children}
              </Layout>
            ) : (
              <Layout className={styles.primaryLayout} style={{height:"auto"}} >
                <Sider trigger={null} width={200} collapsible collapsed={collapsed} theme='light' >
                  <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="light"
                    style={{
                      position:"fixed",
                      width: {siderWidth},
                  }}
                  >
                    <Menu.Item key="1" onClick={() => { router.push('/index') }}>
                      <Icon type="home" />
                      <span>Index</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => { router.push('/table') }}>
                      <Icon type="table" />
                      <span>Table</span>
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Layout style={{height:"auto"}}>
                  <Header style={{ background: '#fff', padding: 0 }}>
                    <Row type="flex">
                      <Col span={2}>
                        <Button className={styles.trigger} onClick={this.toggle} >
                          <Icon
                            style={{ fontSize: '20px' }}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                          />
                        </Button>
                      </Col>
                      <Col span={2} push={19} style={{ textAlign: "center" }} >
                        {
                          username ? (
                            <Dropdown trigger={['click']} overlay={menu}>
                              <Button>
                                {"Hi, " + username}
                                <Icon type="down" />
                              </Button>
                            </Dropdown>
                          ) : (
                              <Link to="/login">
                                <Icon type="user">
                                </Icon>登陆
                          </Link>
                            )
                        }
                      </Col>
                    </Row>
                  </Header>
                  <Content
                    style={{
                      margin: '24px 16px',
                      padding: 24,
                      background: '#fff',
                      minHeight: 280,
                      height:"auto",
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

import React from "react"
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'umi'
import styles from "./login.css"

@Form.create()
class SignIn extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Row type="flex" justify="space-between" align="middle">
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Col><Checkbox>自动登录</Checkbox></Col>)}
            <Col>
              <Link to="/login/signup">
                注册账户
              </Link >
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" className={styles.signinbutton}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default SignIn
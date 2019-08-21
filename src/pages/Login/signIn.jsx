import React from "react"
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link,router } from 'umi'
import styles from "./login.css"

@Form.create()
class SignIn extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        router.push("/index")
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' },
            {min: 6, message: '用户名应不小于6位!'},
            {max: 10, message: '用户名大于10位!'},
          ],
            validateTrigger:"onBlur"
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' },
            {min: 6, message: '密码长度不小于6位!'},
            { pattern: new RegExp(/^[0-9a-zA-Z]{1,}$/, "g") , message: '名称只允许包含数字、字母' }
          ],
            validateTrigger:"onBlur"
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
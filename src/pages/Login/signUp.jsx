import React from "react"
import { Form, Input, AutoComplete, Button, Row } from 'antd';
import { Link,router } from 'umi'
import styles from "./login.css"

@Form.create()
class SignUp extends React.Component {

  state = {
    email: [],
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        router.push("/index")
      }
    });
  };

  emailAutoComplete = value => {
    this.setState({
      email:
        !value || value.indexOf('@') >= 0
          ? []
          : [`${value}@qq.com`, `${value}@163.com`, `${value}@OutLook.com`],
    });
  };

  passwordValidator = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！')
    }

    // 必须总是返回一个 callback，否则 validateFields 无法响应
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your Email !' }],
          })(
            <AutoComplete
              dataSource={this.state.email}
              onChange={this.emailAutoComplete}
              placeholder="邮箱"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please check your Password!', min: 6 }],
          })(
            <Input
              type="password"
              placeholder="至少6位密码，区分大小写"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: 'Please check your Password Confirmation !', min: 6 },
            { validator: this.passwordValidator }
            ],
          })(
            <Input
              type="password"
              placeholder="确认密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Row type="flex" justify="space-between" align="middle">
            <Button type="primary" htmlType="submit" className={styles.signupbutton}>
              注册
              </Button>
            <Link to="/login/signin">
              使用已有账户登陆
              </Link >
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

export default SignUp
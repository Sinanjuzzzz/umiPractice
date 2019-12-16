import React from "react"
import { Form, Input, AutoComplete, Button, Row } from 'antd';
import { Link, router } from 'umi'
import { connect } from 'dva'
import styles from "./login.css"

const mapStateToProps = ({ user, loading }) => {
  const { veriftState } = user
  return {
    veriftState,
    loading: loading.effects['user/sendVerift'],
  }
}

@connect(mapStateToProps)
@Form.create()
class Register extends React.Component {

  state = {
    email: [],
    canPasswordValidate: false,
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
    callback();
  }

  sendVerift = (userPhone) => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/sendVerift',
      payload: {
        userphone: userPhone,
      },
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱!' }],
            validateTrigger: "onBlur"
          })(
            <AutoComplete
              dataSource={this.state.email}
              onChange={this.emailAutoComplete}
              placeholder="邮箱"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('userphone', {
            rules: [{ required: true, message: '请输入手机号码!' },
            { len: 11, message: '请输入11位手机号码!' },
            { pattern: new RegExp(/^[0-9]{1,}$/, "g"), message: '只允许包含数字' }],
            validateTrigger: "onBlur"
          })(
            <Input
              placeholder="请输入可接收验证码的手机号码"
              allowClear
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' },
            { min: 6, message: '密码长度不小于6位!' },
            { pattern: new RegExp(/^[0-9a-zA-Z]{1,}$/, "g"), message: '名称只允许包含数字、字母' }],
            validateTrigger: "onBlur"
          })(
            <Input
              type="password"
              placeholder="至少6位密码，区分大小写"
              allowClear
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: '请输入密码!' },
            { min: 6, message: '密码长度不小于6位!' },
            { validator: this.passwordValidator }],
            validateTrigger: "onBlur"
          })(
            <Input
              type="password"
              placeholder="确认密码"
              allowClear
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
        <Button onClick={() => this.sendVerift(form.getFieldValue('userphone'))} >发送验证码</Button>
      </Form>
    );
  }
}

export default Register
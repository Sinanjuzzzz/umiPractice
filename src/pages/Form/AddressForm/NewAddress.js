import {Fragment} from 'react'
import { Form, Input } from 'antd'

function NewAddress (props){

  const { form} = props
  const { getFieldDecorator } = form

  return (
    <Fragment>
      <Form.Item label='收件人' style={{ display: "flex", position: "relative", margin: "0 auto" }}>
        {getFieldDecorator('addressee', {
        })(
          <Input placeholder='请输入'></Input>
        )}
      </Form.Item>
      <Form.Item label='联系电话' style={{ display: "flex", position: "relative", margin: "0 auto" }}>
        {getFieldDecorator('phone', {
        })(
          <Input placeholder='请输入'></Input>
        )}
      </Form.Item>
      <Form.Item label='详细地址' style={{ display: "flex", position: "relative", margin: "0 auto" }}>
        {getFieldDecorator('details', {
        })(
          <Input placeholder='请输入备注'></Input>
        )}
      </Form.Item>
    </Fragment>
  )
}

export default NewAddress
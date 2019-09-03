import {Fragment} from 'react'
import { Form, Input } from 'antd'

function NewAddress (props){

  const { TextArea } = Input;
  const { form} = props
  const { getFieldDecorator } = form

  return (
    <Fragment>
      <Form.Item label='收件人' style={{ display: "flex", position: "relative", margin: "0 auto" }}>
        {getFieldDecorator('addressee', {
        })(
          <Input placeholder='请输入' style={{position:'relative',width:'300px'}}></Input>
        )}
      </Form.Item>
      <Form.Item label='联系电话' style={{ display: "flex", position: "relative", margin: "0 auto" }}>
        {getFieldDecorator('phone', {
        })(
          <Input placeholder='请输入' style={{position:'relative',width:'300px'}}></Input>
        )}
      </Form.Item>
      <Form.Item label='详细地址' style={{ display: "flex", position: "relative", margin: "0 auto" }}>
        {getFieldDecorator('details', {
        })(
          <TextArea rows={3} placeholder='请输入备注' style={{position:'relative',width:'300px'}}></TextArea>
        )}
      </Form.Item>
    </Fragment>
  )
}

export default NewAddress
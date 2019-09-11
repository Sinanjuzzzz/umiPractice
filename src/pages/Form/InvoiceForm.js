import React, { Fragment } from 'react'
import { Form, Switch, Input, Icon } from 'antd'

function InvoiceForm(props) {

  const { form } = props
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form

  function onChange(checked) {
    setFieldsValue({ invoiceSwitch: checked })
  }

  const invoiceFormItem = () => {
    if (getFieldValue('invoiceSwitch')) {
      return (
        <Fragment>
          <Form.Item label='发票抬头' style={{ display: "flex", position: "relative", margin: "0 auto" }}>
            {getFieldDecorator('invoiceRise', {
              rules: [{ required: true, message: '请输入发票抬头!' }]
            })(
              <Input placeholder='请输入' style={{ position: 'relative', width: '300px' }}></Input>
            )}
          </Form.Item>
          <Form.Item label='纳税人识别号' style={{ display: "flex", position: "relative", margin: "0 auto" }}>
            {getFieldDecorator('taxpayerIdNumber', {
              rules: [{ required: true, message: '请输入纳税人识别号!' }]
            })(
              <Input placeholder='请输入' style={{ position: 'relative', width: '300px' }}></Input>
            )}
          </Form.Item>
          <Form.Item label='电话号码' style={{ display: "flex", position: "relative", margin: "0 auto" }}>
            {getFieldDecorator('phoneNumber', {
              rules: [{ required: true, message: '请输入电话号码!' }]
            })(
              <Fragment>
                <Input placeholder='086' style={{ position: 'relative', width: '100px' }}></Input>
                <Icon type="dash" style={{margin: "0px 5px 0px 5px"}} />
                <Input placeholder='请输入' style={{ position: 'relative', width: '300px' }}></Input>
              </Fragment>
            )}
          </Form.Item>
        </Fragment>
      )
    }
    return null
  }

  return (
    <div>
      <Form.Item label='更多开票信息' style={{ display: "flex", position: "relative", margin: "0 auto" }}>
        {getFieldDecorator('invoiceSwitch', {
          initialValue: false,
        })(
          <Switch checkedChildren="开" unCheckedChildren="关" onChange={onChange} />
        )}
      </Form.Item>
      {
        invoiceFormItem()
      }

    </div>
  )
}

export default Form.create()(InvoiceForm)
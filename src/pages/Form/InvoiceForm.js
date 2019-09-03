import { Form, Switch } from 'antd'

function InvoiceForm(props) {

  const { form } = props
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form

  function onChange(checked) {
    setFieldsValue({ invoiceSwitch: checked })
  }

  const invoiceFormItem = () => {
    if(getFieldValue('invoiceSwitch')){
      return(
        <div>
          发票
        </div>
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
import { Radio, Form, Row, Col } from 'antd';
import AddressCascader from './AddressCascader'
import NewAddress from './NewAddress'

function AddressForm(props) {
  const { form } = props
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form

  function onChange(e) {
    setFieldsValue({ addressType: e.target.value })
  };

  const addressFormItem = [
    (
      <AddressCascader label='公司地址' form={form} />
    ),
    (
      <AddressCascader label='家庭地址' form={form} />
    ),
    (
      <NewAddress form={form} />
    ),
  ]

  return (
    <div>
      <Form.Item label="联系方式" style={{ display: "flex", position: "relative", margin: "0 auto" }}>
        {getFieldDecorator('addressType', {
          initialValue: 0,
          rules: [{ required: true, message: '请选择联系方式!' }]
        })(
          <Radio.Group onChange={onChange} >
            <Radio value={0}>公司地址</Radio>
            <Radio value={1}>家庭地址</Radio>
            <Radio value={2}>新增地址</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Row gutter={8} type="flex" align="middle">
        <Col span={8}>
          {
            addressFormItem[getFieldValue('addressType')]
          }
        </Col>
      </Row>

    </div>
  )
}

export default Form.create()(AddressForm)
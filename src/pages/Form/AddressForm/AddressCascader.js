import { Form, Cascader } from 'antd'

function AddressCascader(props) {
  const { form, label } = props
  const { getFieldDecorator } = form

  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Form.Item label={label} style={{ display: "flex", position: "relative", margin: "0 auto" }}>
        {getFieldDecorator('addressCascader', {
          initialValue: 0,
        })(
          <Cascader options={options} placeholder="请选择" style={{position:'relative',width:'300px'}} />
        )}
      </Form.Item>
  )
}

export default AddressCascader
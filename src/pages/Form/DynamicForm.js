import React from 'react'
import { Icon, Form, Row, Col, Input, Button } from 'antd';


function DynameicForm(props) {

  const { form: { getFieldDecorator, getFieldValue } } = props
  getFieldDecorator('infoList', { initialValue: [{ infoId: "0" }] });
  const infoList = getFieldValue('infoList');

  const infoItems = infoList.map((info, index) => {
    const infoKey = info.infoId
    return (
      <Row gutter={8} type="flex" align="middle" key={infoKey}>
        <Col span={1}>
          {index === 0 ? '乘客：' : null}
        </Col>
        <Col span={2}>
          <Form.Item style={{ position: "relative", margin: "0 auto" }} >
            {getFieldDecorator(`name${infoKey}`, {
              rules: [{}],
            })(<Input placeholder="姓名" />)}
          </Form.Item>
        </Col>
        <Icon type="dash" />
        <Col span={8}>
          <Form.Item style={{ position: "relative", margin: "0 auto" }}>
            {getFieldDecorator(`id${infoKey}`, {
              rules: [{}],
            })(<Input placeholder="身份证号" />)}
          </Form.Item>
        </Col>
        {infoList.length > 1 ? (
          <Icon type="minus-circle" onClick={() => infoRemove(infoKey)} />
        ) : null}
      </Row>
    )
  })

  function infoRemove(infoId) {
    console.log(infoList)
    const { form } = props
    if (infoList.length === 1) {
      return;
    }
    form.setFieldsValue({
      infoList: infoList.filter(info => info.infoId !== infoId),
    });
  }

  function infoAdd() {
    const { form } = props;
    let infoId = infoList[infoList.length - 1].infoId + 1
    const nextInfo = infoList.concat({ infoId: `${infoId}` });
    form.setFieldsValue({
      infoList: nextInfo,
    });
  }

  return (
    <Form>
      {infoItems}
      <Row gutter={8} type="flex" align="middle">
        <Col span={8} push={3}>
          <Button type="dashed" style={{ width: "100%", position: "relative", left: "14px" }} onClick={infoAdd}>
            <Icon type="plus" /> 添加
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(DynameicForm)
import React from 'react'
import { Icon, Form, Row, Col, Input, Button } from 'antd';


function DynameicForm(props) {

  const infoId = 0
  const { form: { getFieldDecorator, getFieldValue } } = props
  getFieldDecorator('infoList', { initialValue: [{ infoId: "0" }, { infoId: "1" }] });
  const infoList = getFieldValue('infoList');

  const infoItems = infoList.map((info) => {
    const infoId = info.infoId
    return (
      <Row gutter={8} type="flex" align="middle" key={infoId}>
        <Col span={2}>
          <Form.Item style={{ position: "relative", margin: "0 auto" }} >
            {getFieldDecorator(`name${infoId}`, {
              rules: [{}],
            })(<Input />)}
          </Form.Item>
        </Col>
        <Icon type="dash" />
        <Col span={8}>
          <Form.Item style={{ position: "relative", margin: "0 auto" }}>
            {getFieldDecorator(`id${infoId}`, {
              rules: [{}],
            })(<Input />)}
          </Form.Item>
        </Col>
        {infoList.length > 1 ? (
          <Icon type="minus-circle" onClick={() => infoRemove(infoId)} />
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

  function infoAdd(infoId) {
    const { form } = this.props;
    const infoList = form.getFieldValue('infoList');
    const newList = infoList.concat({infoId:++infoId});
  }

  return (
    <Form>
      {infoItems}
      <Row gutter={8} type="flex" align="middle">
        <Col span={8} push={2}>
          <Button type="dashed" style={{ width: "100%",position:"relative",left:"14px" }}>
            <Icon type="plus" /> 添加
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(DynameicForm)
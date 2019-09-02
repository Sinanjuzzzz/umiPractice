import React, { useState } from 'react';
import { Row, Col, Form, DatePicker } from 'antd'
import moment from 'moment';

function DateForm(props) {
  const { form: { getFieldDecorator } } = props
  const [startValue, setStartValue] = useState(null)
  const [endValue, setEndValue] = useState(null)
  const [endOpen, setEndOpen] = useState(false)
  const dateFormat = 'YYYY-MM-DD'

  function disabledStartDate(startValue) {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  function disabledEndDate(endValue) {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  function onStartChange(value) {
    setStartValue(value);
  }

  function onEndChange(value) {
    setEndValue(value);
  };

  function handleStartOpenChange(open) {
    if (!open) {
      setEndOpen(true)
    }
  };

  function handleEndOpenChange(open) {
    setEndOpen(open)
  };


  return (
    <div>
      <Row align="middle">
      <Col span={8}>
        <Form.Item label="开始时间" style={{ display: "flex", position: "relative", margin: "0 auto" }}>
          {getFieldDecorator('startDate', { initialValue: startValue })(
            <DatePicker
              disabledDate={disabledStartDate}
              showTime
              format="YYYY-MM-DD"
              placeholder={moment().format(dateFormat)}
              onChange={onStartChange}
              onOpenChange={handleStartOpenChange}
              style={{width:"300px"}}
            />)}
        </Form.Item>
        </Col>
      </Row>
      <Row align="middle">
      <Col span={8}>
        <Form.Item label="结束时间" style={{ display: "flex", position: "relative", margin: "0 auto"}}>
          {getFieldDecorator('endDate', { initialValue: endValue })(
            <DatePicker
              disabledDate={disabledEndDate}
              showTime
              format="YYYY-MM-DD"
              placeholder={moment().format(dateFormat)}
              onChange={onEndChange}
              open={endOpen}
              onOpenChange={handleEndOpenChange}
              style={{width:"300px"}}
            />)}
        </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default Form.create()(DateForm)
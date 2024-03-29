/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react"
import { Table, Pagination, Row, Col, Input, Form, Button, Icon, Radio } from "antd"
import { Link } from "umi"
import { connect } from "dva"

const columns = [
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId',
    sorter: (a, b) => a.userId - b.userId,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '事件ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '是否完成',
    dataIndex: 'completed',
    key: 'completed',
    render: completed => (
      <span>
        {completed ? "已完成" : "未完成"}
      </span>
    ),
    filters: [
      {
        text: '未完成',
        value: false,
      },
      {
        text: '已完成',
        value: true,
      },
    ],
    onFilter: (value, todo) => todo.completed === value,
  },
  {
    title: '详情',
    dataIndex: 'id',
    key: 'xq',
    render: id => (
      <Link to={`/detail/${id}`}>
        详情
      </Link>
    ),
  },
]

const mapStatetoProps = ({ todos, loading }) => {
  const { list, total, page, size } = todos;
  return {
    list,
    total,
    page,
    size,
    loading: loading.effects['todos/queryToDo'],
  };
}

@Form.create()
@connect(mapStatetoProps)
class todosTable extends React.Component {

  state = {
    selectedRowKeys: [],
    queryParams: [],
    expand: false,
  };

  componentDidMount() {
    this.queryToDo(this.state.queryParams, 1, 10)
  }

  getFields() {
    const count = this.state.expand ? 4 : 3;
    const { getFieldDecorator } = this.props.form;
    const children = [
      (
        <Col span={8} key={0} style={{ display: 'block' }}>
          <Form.Item label={'用户ID'} style={{ display: 'flex' }}>
            {getFieldDecorator('userId', {
              rules: [
              ],
            })(<Input placeholder="请输入用户ID" />)}
          </Form.Item>
        </Col>
      ),
      (
        <Col span={8} key={1} style={{ display: 'block' }}>
          <Form.Item label={'事件ID'} style={{ display: 'flex' }}>
            {getFieldDecorator('id', {
              rules: [
              ],
            })(<Input placeholder="请输入事件ID" />)}
          </Form.Item>
        </Col>
      ),
      (
        <Col span={8} key={2} style={{ display: 'block' }}>
          <Form.Item label={`是否完成`} style={{ display: 'flex' }}>
            {getFieldDecorator(`completed`, {
              rules: [
              ],
            })(<Radio.Group>
              <Radio value={true}>已完成</Radio>
              <Radio value={false}>未完成</Radio>
            </Radio.Group>)}
          </Form.Item>
        </Col>
      ),
      (
        <Col span={8} key={3} style={{ display: count === 4 ? 'block' : 'none' }}>
          <Form.Item label={`空着`} style={{ display: 'flex' }}>
            {getFieldDecorator(`empty`, {
              rules: [
              ],
            })(<Input placeholder="闲着也是空着" />)}
          </Form.Item>
        </Col>
      ),
    ];

    return children;
  }

  queryToDo(queryParams, page, size) {
    this.setState({
      queryParams,
    })
    const { dispatch } = this.props
    dispatch({
      type: 'todos/queryToDo',
      payload: {
        queryParams,
        page,
        size,
      }
    })
  }

  onShowSizeChange = (page, size) => {
    const { queryParams } = this.state;
    this.queryToDo(queryParams, page, size)
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
      const queryParams = [values.userId, values.id, values.completed]
      this.queryToDo(queryParams, 1, this.props.size)
    });
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {

    const { selectedRowKeys, queryParams } = this.state;
    const { loading, list, total, page, size } = this.props
    const pageSizeOptions = ['5', '10', '15']
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Fragment>
        <Row type="flex" justify="space-between" gutter={24} style={{ width: '80%', left: '13%', position: 'relative' }}>
          {this.getFields()}
        </Row>
        <Row type="flex" justify="end" gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={8} style={{ textAlign: 'left' }}>
            <Button type="primary" htmlType="submit" onClick={this.handleSearch}>
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              展开 <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            rowKey={record => record.id}
            pagination={false}
            rowSelection={rowSelection}
          />
        </Row>
        <Row type="flex" justify="center">
          <Pagination
            showSizeChanger
            pageSizeOptions={pageSizeOptions}
            onShowSizeChange={this.onShowSizeChange}
            total={total}
            current={page}
            pageSize={size}
            onChange={(currentPage, pageSize) => { this.queryToDo(queryParams, currentPage, pageSize) }}
            style={{ margin: "20px 20px 20px 20px" }}
          />
        </Row>
      </Fragment>
    )
  }
}

export default todosTable
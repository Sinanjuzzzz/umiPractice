import React, { Fragment } from "react"
import { Table, Pagination, Row, Col, Select, Input, Form, Button, Icon } from "antd"
import { Link } from "umi"
import { connect } from "dva"

// const { Search } = Input
// const { Option } = Select;

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
    queryMode: null,
    queryValue: null,
    expand: false,
  };

  componentDidMount() {
    this.queryToDo(null, null, 1, 10)
  }

  getFields() {
    const count = this.state.expand ? 4 : 3;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 4; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder="placeholder" />)}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }

  queryToDo(queryMode, queryValue, page, size) {
    this.setState({
      queryValue,
    })
    const { dispatch } = this.props
    dispatch({
      type: 'todos/queryToDo',
      payload: {
        queryMode,
        queryValue,
        page,
        size,
      }
    })
  }

  onModChange = (value) => {
    this.setState({ queryMode: value })
  }

  onShowSizeChange = (page, size) => {
    const { queryMode, queryValue } = this.state;
    this.queryToDo(queryMode, queryValue, page, size)
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {

    const { selectedRowKeys, queryMode, queryValue } = this.state;
    const { loading, list, total, page, size } = this.props
    const pageSizeOptions = ['5', '10', '15']
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Fragment>
        <Row type="flex" justify="start" gutter={24} style={{width:"80%",left:"10%",position:"relative"}}>
        {this.getFields()}
          {/* <Col >
            <Select
              showSearch
              style={{ width: 102 }}
              placeholder="查询方式"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={option => { this.onModChange(option) }}
            >
              <Option value="id">ID</Option>
              <Option value="userId">UserID</Option>
            </Select>
          </Col>
          <Col span={10} >
            <Search
              placeholder={queryMode ? ("请输入" + queryMode):"请选择查询方式" }
              enterButton="Search"
              size="default"
              onSearch={value => this.queryToDo(queryMode, value, 1, size)}
              allowClear
            />
          </Col> */}
        </Row>
        <Row style={{position:"relative",right:"10%",marginBottom:"20px"}}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
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
            onChange={(currentPage, pageSize) => { this.queryToDo(queryMode, queryValue, currentPage, pageSize) }}
            style={{ margin: "20px 20px 20px 20px" }}
          />
        </Row>
      </Fragment>
    )
  }
}

export default todosTable
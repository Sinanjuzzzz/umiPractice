import React, { Fragment } from "react"
import { Table, Pagination, Row, Col, Select, Input } from "antd"
import { Link } from "umi"
import { connect } from "dva"

const { Search } = Input
const { Option } = Select;

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
    loading: loading.effects['todos/fetchToDosList'],
  };
}

@connect(mapStatetoProps)
class todosTable extends React.Component {

  state = {
    selectedRowKeys: [],
    queryMode: "id"
  };

  componentDidMount() {
    this.fetchToDosList(1, 10)
  }

  fetchToDosList = (page, size) => {
    const { dispatch } = this.props
    dispatch({
      type: "todos/fetchToDosList",
      payload: {
        page,
        size,
      }
    })
  }

  queryToDo(queryMode, queryValue, page, size) {
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
    this.fetchToDosList(page, size)
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {

    const { selectedRowKeys, queryMode } = this.state;
    const { loading, list, total, page, size } = this.props
    const pageSizeOptions = ['5', '10', '15']
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Fragment>
        <Row type="flex" justify="center" style={{ marginBottom: "20px" }}>
          <Col>
            <Select
              showSearch
              style={{ width: 100 }}
              placeholder="查询方式"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={option => { this.onModChange(option) }}
              defaultValue="id"
            >
              <Option value="id">ID</Option>
              <Option value="userId">UserID</Option>
            </Select>
          </Col>
          <Col span={10} >
            <Search
              placeholder={"输入" + queryMode}
              enterButton="Search"
              size="default"
              onSearch={value => this.queryToDo(queryMode, value, 1, size)}
              allowClear
            />
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
            onChange={this.fetchToDosList}
            style={{ margin: "20px 20px 20px 20px" }}
          />
        </Row>
      </Fragment>
    )
  }
}

export default todosTable
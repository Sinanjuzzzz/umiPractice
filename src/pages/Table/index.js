import React, { Fragment } from "react"
import { Table, Pagination } from 'antd'
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

  onShowSizeChange = (page, size) => {
    this.fetchToDosList(page, size)
  }

  render() {
    const { loading, list, total, page, size } = this.props
    const pageSizeOptions = ['5', '10', '15']
    return (
      <Fragment>
        <Table
          columns={columns}
          dataSource={list}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />

        <Pagination
          showSizeChanger
          pageSizeOptions={pageSizeOptions}
          onShowSizeChange={this.onShowSizeChange}
          total={total}
          current={page}
          pageSize={size}
          onChange={this.fetchToDosList}
        />
      </Fragment>
    )
  }
}

export default todosTable
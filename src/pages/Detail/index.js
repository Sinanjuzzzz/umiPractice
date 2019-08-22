import React from "react"
import { connect } from 'dva'
import { Icon, Descriptions, Spin } from 'antd';

const mapStatetoProps = ({ todos, loading }) => {
  const { list } = todos;
  return {
    todo: list[0],
    loading: loading.effects['todos/queryToDo'],
  };
}

@connect(mapStatetoProps)
class Detail extends React.Component {

  componentDidMount() {
    const { match: { params: { id } } } = this.props
    this.queryByID(id)
  }

  queryByID(id) {
    const { dispatch } = this.props
    dispatch({
      type: 'todos/queryToDo',
      payload: {
        queryMode: "id",
        queryValue: id,
        page: 1,
        size: 1,
      }
    })
  }

  render() {
    const { todo, loading } = this.props
    return (
      <Spin spinning={loading}>
        <Descriptions bordered>
          <Descriptions.Item label="ID">{todo.id}</Descriptions.Item>
          <Descriptions.Item label="UserID">{todo.userId}</Descriptions.Item>
          <Descriptions.Item label="Title">{todo.title}</Descriptions.Item>
          <Descriptions.Item label="completed">{todo.completed ? <Icon type="check" /> : <Icon type="close" />}</Descriptions.Item>
        </Descriptions>
      </Spin>

    )
  }
}

export default Detail
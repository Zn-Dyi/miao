
import React from "react";
import { connect } from "react-redux";

class ComA extends React.Component {

  handleClick = () => {
    console.log('Coma:', this.props)
    // 发送 action
    this.props.sendAction()
  }

  render() {
    return (
      <button onClick={this.handleClick}> + </button>
    )
  }
}

/**
 * 这个函数要有一个返回值，返回的是一个对象。
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return {
    sendAction: () => {
      // 利用 dispatch 发送一个 action
      // 传递 action 对象我们要定义一个 type 属性
      dispatch({
        type: 'add_action'
      })
    }
  }
}

// A 是发送方，所以要实现 connect 第二个参数
export default connect(null, mapDispatchToProps)(ComA);

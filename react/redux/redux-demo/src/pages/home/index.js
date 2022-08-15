import React from "react";

// 导入 store
import store from "../../store";

// 导入 action 构建函数
import { sendAction } from "../../action";


export default class Home extends React.Component {

  handleClick = () => {
    const action = sendAction()

    // 发送一个action 利用store
    store.dispatch(action)
  }

  // 当组件加载完毕的时候要监听
  componentDidMount() {
    store.subscribe(() => {
      console.log('subscribe:', store.getState());
      this.setState({})
    })
  }

  render() {
    return (
    <>
        <button onClick={this.handleClick}>Click Me</button>
        <div>{store.getState().value }</div>
    </>

    )
  }
}

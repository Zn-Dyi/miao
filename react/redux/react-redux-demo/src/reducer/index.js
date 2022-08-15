/**
 * 接受两个参数
 * 一个是state
 * 一个是action
 */

const initState = {
  count: 0,
}

/**
 * reducer 要接受action 然后进行逻辑处理
 * 判断发送过来的action 是不是我们需要的
 * 如果是我们需要的，就应该 return 一个新的 state
 */
exports.reducer = (state = initState, action) => {
  console.log('reducer:', action)
  switch (action.type) {
    case 'add_action':
      return {
        count: state.count + 1
      }
    default:
      return state;
  }
}

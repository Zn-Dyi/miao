/**
 * 这个文件是 创建reducer函数的，专门用来处理发送过来的 action
 *
 */

const initState = {
  value: "默认值"
};
const reducer = (state = initState, action) => {
  console.log('reducer:', state, action)
  switch (action.type) {
    case "send_type":
      return Object.assign({}, state, action)
    default:
      return state;
  }
};

module.exports = {
  reducer
};

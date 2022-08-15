/**
 *  这是Action的构建函数
 *
 *  **/

const sendAction = () => {
  //  我们需要返回一个 action 的对象
  return {
    type: "send_type",
    value: "我是一个 action",
  };
};

module.exports = {
  sendAction
};



export const Reset = (prevState = { show: true }, action) => {
  console.log(action)

  let { type } = action
  switch (type) {
    case "change_check":
      // 一定要先对老状态进行深复制，在对新状态进行操作。
      let newState = { ...prevState }
      newState.show= !newState.show
      return newState
    default:
      return prevState
  }
}

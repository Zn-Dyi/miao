
const initState = {
  status: false
}

exports.loveReducer = (state = initState, action) => {
  console.log('reducer:', state, action)
  switch (action.type) {
    case "send_love":
      return {
        status: true
      }
    case "stop_love":
      return {
        status: false
      }
    default:
      return state
  }
}

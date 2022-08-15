
import { Action, AnyAction } from "redux";
import { createStore, Reducer } from "redux";
import { produce } from 'immer';


//  action type的类型
type ActionTypes =
  | 'updateActiveTasks'
  | 'updateWaitingTasks'
  | 'updateStoppedTasks'
  | 'updateServers'
  | 'updateSelectedServerIndex'
  | 'updateSelectedTasksGid'

type MyActions = Action<ActionTypes>





// 为所需状态声明类型
export interface State {
  activeTasks: any[],
  waitingTasks: any[],
  stoppedTasks: any[],
  servers: any[],
  selectedServerIndex: number,
  selectedTasksGid: string[],
}

// 状态的定义
const initState: State = {
  activeTasks: [],
  waitingTasks: [],
  stoppedTasks: [],
  servers: [],
  selectedServerIndex: 0,
  selectedTasksGid: [],
}

// Reducer<State, AnyAction>    reducer函数的泛型类型，State是状态的类型，AnyAction是action的类型
const reducer: Reducer<State, AnyAction> = (state: State = initState, action: AnyAction): State => {

  switch (action.type) {
    case 'updateActiveTasks':
      return produce(state, draft => {
        draft.activeTasks = action.tasks
      })
  }
  return state
}

const store = createStore(reducer, initState)

export default store


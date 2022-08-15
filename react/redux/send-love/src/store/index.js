// 1. 导入createStore
import { createStore } from 'redux';

// 2. 导入reducer
import { loveReducer } from '../reducer';

// 3. 通过 create 来创建
export default createStore(loveReducer)

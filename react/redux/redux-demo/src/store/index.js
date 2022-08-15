import { createStore } from 'redux';

// 导入我们自己写好的reducer

import { reducer } from '../reducer';

// 构建 Store

const store = createStore(reducer)

export default store;

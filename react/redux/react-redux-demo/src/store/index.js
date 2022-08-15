import { createStore } from "redux";

// 导入我们自己的reducer 处理函数
import { reducer } from "../reducer";

// 构建 store
export default createStore(reducer);

import React from 'react';
import ComA from './pages/ComA';
import ComB from './pages/ComB';

// 导入我们的 store
import store from './store';

// 导入Provider组件，利用这个组件包裹我们的结构，从而能够达到统一维护 store 的效果
import { Provider } from 'react-redux';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ComA />
        <ComB />
      </div>
    </Provider>

  );
}

export default App;
